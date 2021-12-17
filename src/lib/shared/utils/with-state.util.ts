import { state as _state, State } from ".."


export const withState = (
   state: Partial<State>,
   cb: Function
) => {
   const originalStatePartial: Partial<State> = {}

   for (const stateKey in state) {
      originalStatePartial[stateKey] = _state[stateKey] as any
      _state[stateKey] = state[stateKey]
   }

   const result = cb()

   for (const stateKey in originalStatePartial)
      _state[stateKey] = originalStatePartial[stateKey]
   
   return result
}
