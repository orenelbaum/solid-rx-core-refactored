import { nodeIsComputationWithSources, READY } from '../..'
import { cleanComputationSources } from '.'
import type { Owner, Computation } from '../..'


export function cleanNode(node: Owner) {
   // If node is a computation and has sources, unsubscribe from all sources, and
   // reset the sources list
   if (nodeIsComputationWithSources(node))
      cleanComputationSources(node)
 
   // If node owns computations, clean them and reset owned computations
   if (node.ownedComputations) {
      for (const ownedComputation of node.ownedComputations)
         cleanNode(ownedComputation)
      node.ownedComputations = null
   }
 
   // If any cleanups are registered, perform them and reset the cleanup list
   if (node.cleanupCbs) {
      for (const cleanup of node.cleanupCbs) cleanup()
      node.cleanupCbs = null
   }

   // Reset state and context
   ;(node as Computation<any>).state = READY
   node.context = null
}
