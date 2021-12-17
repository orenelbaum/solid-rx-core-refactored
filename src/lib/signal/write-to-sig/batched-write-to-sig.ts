import { state, NOT_PENDING } from '../..'
import type { Sig, Memo } from '../..'


// Set the value as pending and make sure the sig is the pending list.
export function batchedWriteToSig(
   sig: Sig<any> | Memo<any>,
   val: any
){
   if (sig.pendingVal === NOT_PENDING)
      state.pendingSigs.push(sig)
      
   sig.pendingVal = val
}
