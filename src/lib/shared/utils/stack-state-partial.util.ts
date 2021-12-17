import { state, State } from ".."


export const stackStatePartial = (
   stateKeysToStack: Array<keyof State>,
   callback: Function
) => {
   const originalStatePartial: Partial<State> = {}
   for (const stateKey of stateKeysToStack)
      originalStatePartial[stateKey] = state[stateKey] as any

   callback()

   for (const stateKey in originalStatePartial)
      state[stateKey] = originalStatePartial[stateKey]
}
