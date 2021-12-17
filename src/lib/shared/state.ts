import { runQueue } from '.'
import type { Computation, Sig, Owner } from '..'


export interface State {
   owner: Owner | null
   listener: Computation<any> | null

   // Pure computations that are observing signals and need to be updated.
   // This array will exist only inside a runUpdates invocation.
   updates: Computation<any>[] | null

   // Effects that are observing signals and need to be updated.
   // This array will exist only inside a runUpdates invocation.
   effects: Computation<any>[] | null

   execCount: number

   // The pending signals array is used in the batch function.
   // Signals that get written to during batch won't actually get updated, instead the
   // value will be saved as pending and will be updated at the end of the batch.
   pendingSigs: Sig<any>[] | null

   runEffects: typeof runQueue
}

export const state: State = {
   owner: null,
   listener: null,
   pendingSigs: null,
   updates: null,
   effects: null,
   execCount: 0,
   runEffects: runQueue
}
