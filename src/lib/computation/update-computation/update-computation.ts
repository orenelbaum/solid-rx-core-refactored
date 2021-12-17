import { state, cleanNode, runComputation, withState } from '../..'
import type { Computation } from '..'


// Cleans the computation, then runs the computation with the computation as owner and listener.
export function updateComputation(computation: Computation<any>) {
   if (!computation.cb) return

   cleanNode(computation)

   // Run the computation with the computation as owner and listening computation.
   withState(
      {
         listener: computation,
         owner: computation
      },
      () => {
         runComputation(
            computation,
            computation.val,
            state.execCount
         )
      }
   )
}
