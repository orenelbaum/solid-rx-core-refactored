import { State, state } from '..'


export const setState = (statePartial: Partial<State>) => {
   for (const key in statePartial)
      state[key] = statePartial[key]
}
