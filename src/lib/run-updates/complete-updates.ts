import { state, runQueue, batch } from '..'


export function completeUpdates(shouldRunEffects: boolean) {
   if (state.updates) {
      runQueue(state.updates)
      state.updates = null
   }

   if (!shouldRunEffects) return

   if (state.effects.length)
      batch(() => {
         state.runEffects(state.effects)
         state.effects = null
      })
   else state.effects = null
}
