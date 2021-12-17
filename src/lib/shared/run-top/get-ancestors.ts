import { state } from '../state'
import { Computation } from '../../computation/computation.interface'
import { computationIsReady } from '../../computation/computation-is-ready'


// Make an ancestor array, which includes this node, it's owner, it's owner's owner, etc.
// The ancestor array includes only computations (skips roots), and will stop recursing
// at a computation that has been updated in the current execution round.

export const getAncestors = (computation: Computation<any>) => {
   const ancestors = [computation]

   let ancestor = computation.owner as Computation<any>

   while (
      ancestor
      && (
         !ancestor.updatedAt
         || ancestor.updatedAt < state.execCount
      )
   ) {
      if (!computationIsReady(ancestor))
         ancestors.push(ancestor)
      
      ancestor = ancestor.owner as Computation<any>
   }

   return ancestors
}
