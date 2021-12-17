import { state } from '../..'
import type { Sig, Memo } from '../..'


export function subscribeListenerToSig(sig: Sig<any> | Memo<any>) {
   const { listener } = state
   
   const sourceSlot = sig.observers?.length || 0

   if (!listener.sources) {
      listener.sources = [sig]
      listener.sourceSlots = [sourceSlot]
   }
   else {
      listener.sources.push(sig)
      listener.sourceSlots.push(sourceSlot)
   }

   if (!sig.observers) {
      sig.observers = [listener]
      sig.observerSlots = [listener.sources.length - 1]
   }
   else {
      sig.observers.push(listener)
      sig.observerSlots.push(
         listener.sources.length - 1
      )
   }
}
