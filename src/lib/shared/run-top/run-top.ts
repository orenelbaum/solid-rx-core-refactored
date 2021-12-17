import { updateComputation } from '../../computation/update-computation/update-computation'
import { updateUpstreamMemos } from '../update-upstream-memos'
import { getAncestors } from './get-ancestors'
import { reverseForEach } from '../utils/reverse-for-each.util'
import { withState } from '../utils/with-state.util'
import { PENDING, READY, STALE } from '../../shared/constants'
import type { Computation } from '../../computation/computation.interface'


// Gets a stale computation and updates the whole reactive branch that leads to
// the computation.
export function runTop(computation: Computation<any>) {
   if (computation.state !== STALE) {
      computation.state = READY
      return
   }

   // Get ancestor (ownership wise) computations that haven't been updated yet and are not ready.
   const ancestors = getAncestors(computation)
   
   // Execute ancestors from top to bottom
   reverseForEach(
      ancestors,
      ancestor => {
         if (ancestor.state === STALE) updateComputation(ancestor)

         else if (ancestor.state === PENDING)
            withState(  
               { updates: null },
               () => updateUpstreamMemos(ancestor)
            )
      }
   )
}
