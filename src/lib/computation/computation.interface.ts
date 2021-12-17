import { ComputationState } from '.'
import type { Owner, Sig } from ".."


export interface Computation<Val> extends Owner {
   cb: (val?: Val) => Val
   
   state: ComputationState

   // Signals the computation is listening to
   sources: Sig<Val>[] | null

   // If sourceSignal === [sig1, sig2, sig3], then sourceSlots would be [sig1Slot, sig2Slot, sig3Slot]
   // For a signal sigX, sigXSlot is the index of this computation in the signal's observing computations array.
   sourceSlots: number[] | null

   // The value returned from the last run of the computation
   val?: Val

   // The index of the last execution in which the computation was run
   updatedAt: number | null

   // Pure - memo, deffered, computed, selector
   // Unpure - effect, renderEffect
   pure: boolean
   
   // Created with createEffect or not
   user?: boolean
}
