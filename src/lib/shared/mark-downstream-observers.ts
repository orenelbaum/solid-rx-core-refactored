import { state, computationIsReady, computationIsMemoWithObserversArray, PENDING } from '..'
import type { Memo } from ".."


// Marks all ready downstream observers as pending and adds them to updates or effects.
export function markDownstreamObservers(memo: Memo<any>) {
   for (const obs of memo.observers)
      if (computationIsReady(obs)) {
         obs.state = PENDING

         if (obs.pure) state.updates.push(obs)         
         else state.effects.push(obs)

         if (computationIsMemoWithObserversArray(obs))
            markDownstreamObservers(obs)
      }
}
