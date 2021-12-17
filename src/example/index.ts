import { createSignal } from '../lib/signal/create-signal'
import { createRoot } from "../lib/create-root"
import { createEffect } from '../lib/effect/create-effect'


const [signal, setSignal] = createSignal(0)

createRoot(() => {
   createEffect(
      () => console.log(signal())
   )
})

setSignal(1)

// setTimeout(
//    () => setSignal(signal() + 1),
//    1000
// )
