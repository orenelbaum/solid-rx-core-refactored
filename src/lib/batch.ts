import { state, runUpdates, writeToSig, NOT_PENDING } from '.'
import type { Sig } from '.'


export function batch<Val>(cb: () => Val): Val {
   if (state.pendingSigs) return cb()
   
   state.pendingSigs = []
   const sigQueue: Sig<any>[] = state.pendingSigs
   
   const result = cb()
   state.pendingSigs = null
 
   runUpdates(
      () => {
         for (const sig of sigQueue)
            if (sig.pendingVal !== NOT_PENDING) {
               const { pendingVal } = sig
               sig.pendingVal = NOT_PENDING
               writeToSig(sig, pendingVal)
            }
      },
      false
   )
 
   return result
}
