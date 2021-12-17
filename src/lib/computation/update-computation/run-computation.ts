import { writeToSig, computationIsMemoWithObservers } from '../..'
import type { Computation } from "../.."


// Invokes the computation's callback.
// If the computation is a memo with observers and it wasn't updated at the current
// execution round, write the return value of the callback into the memo with
// writeSignal.
export function runComputation(
   computation: Computation<any>,
   val: any,
   time: number
) {
   const nextVal = computation.cb(val)

   if (!computation.updatedAt || computation.updatedAt <= time) {
      if (computationIsMemoWithObservers(computation))
         writeToSig(computation, nextVal)

      else computation.val = nextVal
      
      computation.updatedAt = time
   }
}
