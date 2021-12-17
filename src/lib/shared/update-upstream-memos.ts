import { runTop, sigIsMemoWithSourcesArray } from '..'
import { STALE, PENDING, READY } from './constants'
import type { Computation } from ".."


// Makes a memo ready by updating upstream stale memos.
// Stale memos will get updated as well as the reactive branch that leads to them.
export function updateUpstreamMemos(computation: Computation<any>) {
   computation.state = READY
   
   for (const source of computation.sources)
      if (sigIsMemoWithSourcesArray(source)) {
         if (source.state === STALE)
            runTop(source)

         else if (source.state === PENDING)
            updateUpstreamMemos(source)
      }
}
