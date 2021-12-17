import {
   state, runUpdates, markDownstreamObservers, computationIsMemoWithObservers,
   computationIsReady, STALE
} from '../..'
import type { Sig, Memo } from '../..'


export const updateSigObservers = (sig: Sig<any> | Memo<any>) => {

   // Mark all ready immediate observers as stale and all ready non-immediate downstream
   // observers as pending.
   // Add all ready downstream observers to updates list or effects list.
   function registerObserversAndNotifyDownstream() {
      for (const obs of sig.observers) {
         // Add effects to effects list and updates to updates list
         if (obs.pure) state.updates.push(obs)
         else state.effects.push(obs)

         if (
            computationIsMemoWithObservers(obs)
            && computationIsReady(obs)
         )
            markDownstreamObservers(obs)
   
         obs.state = STALE
      }
   }

   runUpdates(registerObserversAndNotifyDownstream, false)
}
