import { runTop } from '..'
import type { Computation } from '..'

// Runs all render effects with `runTop`, then user effects, then any effects that were
// added while running user effects.
export function runRenderEffects(queue: Computation<any>[]) {
   let userEffectsCount = 0

   // Run all render effects and put all user effects at the start of the queue
   for (const effect of queue) {
      // If effect is renderEffect
      if (!effect.user) runTop(effect)

      else {
         queue[userEffectsCount] = effect
         userEffectsCount++
      }
   }

   return { userEffectsCount }
}