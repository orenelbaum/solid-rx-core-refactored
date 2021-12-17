import type { Computation } from ".."


export interface Sig<Val> {
   // The value the signal is holding
   val?: Val

   // A list of observing computations
   observers: Computation<any>[] | null

   // If observers === [obs1, obs2, obs3], then sourceSlots would be
   // [obs1Slot, obs2Slot, comp3Slot]
   // For an observer obsX, obsXSlot is the index of this signal in the observer's
   // sources array.
   observerSlots: number[] | null

   // A new value which is pending
   pendingVal: Val | {}

   // A function to compare two possible values
   comparator?: (prev: Val, next: Val) => boolean
}
