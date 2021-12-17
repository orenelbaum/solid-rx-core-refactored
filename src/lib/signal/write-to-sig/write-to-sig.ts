import { state } from '../..'
import { batchedWriteToSig, updateSigObservers } from '.'
import type { Sig, Memo } from '../..'


export function writeToSig(
   sig: Sig<any> | Memo<any>,
   val: any
)  {
   if (sig?.comparator(sig.val, val)) return val
   
   // If running inside batch
   if (state.pendingSigs) batchedWriteToSig(sig, val)
   else {
      sig.val = val
      if (sig.observers?.length) updateSigObservers(sig)
   }

   return val
}
