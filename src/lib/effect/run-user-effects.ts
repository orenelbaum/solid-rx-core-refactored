import { runTop } from '..'
import { runRenderEffects } from '.'
import type { Computation } from '..'


// Runs all render effects with `runTop`, then user effects, then any effects that were
// added while running user effects.
export function runUserEffects(queue: Computation<any>[]) {
   const { userEffectsCount } = runRenderEffects(queue)

   const resume = queue.length
   
   // Run user effects
   for (let i = 0; i < userEffectsCount; i++) runTop(queue[i])

   // Run any effects that were added as a result of the last step
   for (let i = resume; i < queue.length; i++) runTop(queue[i])
}
