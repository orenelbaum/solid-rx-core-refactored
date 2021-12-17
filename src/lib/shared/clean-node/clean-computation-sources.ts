import type { Computation } from '../..'


export const cleanComputationSources = (computation: Computation<any>) => {
   while (computation.sources.length) {
      // Remove the signal from the computation's sources
      const copmutationSource = computation.sources.pop()
      const computationIndexInSource = computation.sourceSlots.pop()

      // Remove the computation from the source's observers
      const sourceObservers = copmutationSource.observers
      if (sourceObservers?.length) {
         const poppedObserver = sourceObservers.pop()
         const sourceIndexInPoppedObserver = copmutationSource.observerSlots.pop()

         // If `poppedObserver` is not the computation, and computation is still in sourceObservers
         if (computationIndexInSource < sourceObservers.length) {
            // Set info on poppedObserver: poppedObservers's index in source = computation's index in source
            poppedObserver.sourceSlots[sourceIndexInPoppedObserver] = computationIndexInSource

            sourceObservers[computationIndexInSource] = poppedObserver
            copmutationSource.observerSlots[computationIndexInSource] = sourceIndexInPoppedObserver
         }
      }
   }
}
