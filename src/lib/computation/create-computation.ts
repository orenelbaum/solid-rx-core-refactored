import { state as appState, STALE, UNOWNED } from '..'
import type { Computation, ComputationState } from './'


// creates a computation object and returns it.
// If there's a current owner it will also add the computation to the owner's owned computations.
export function createComputation<Val>(
   cb: (val?: Val) => Val,
   init: Val | undefined,
   pure: boolean,
   state: ComputationState = STALE
) {
   const computation: Computation<Val> = {
      cb,
      state,
      updatedAt: null,
      ownedComputations: null,
      sources: null,
      sourceSlots: null,
      cleanupCbs: null,
      val: init,
      owner: appState.owner,
      context: null,
      pure
   }

   if (appState.owner !== UNOWNED) {
      if (!appState.owner.ownedComputations)
         appState.owner.ownedComputations = [computation]
      
      else appState.owner.ownedComputations.push(computation)
   }

   return computation
}
