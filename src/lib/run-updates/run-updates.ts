import { state } from '..'
import { completeUpdates } from '.'


export function runUpdates(cb: () => void, initial: boolean) {
   // If update is not an initial update (not called from createEffect), prevent nested
   // runUpdates calls.
   if (state.updates) return cb()
   if (!initial) state.updates = []
   
   // If this is not an initial update, don't run effects only updates.
   const shouldRunEffects = !state.effects
   if (!state.effects) state.effects = []

   state.execCount++

   cb()
   
   completeUpdates(shouldRunEffects)
}
