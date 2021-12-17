import { state, createComputation, STALE } from '..'
import { runUserEffects } from '.'


// Creates a stale effect object, registers it with the current owner and adds it to the 
// effects list.
export function createEffect<Val>(
   cb: (val?: Val) => Val,
   init?: Val
): void {
   state.runEffects = runUserEffects
   
   const effect = createComputation(
      cb,
      init,
      false,
      STALE
   )

   effect.user = true

   state?.effects.push(effect)
}
