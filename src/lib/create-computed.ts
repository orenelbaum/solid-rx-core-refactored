import { createComputation, updateComputation, STALE } from "."


export function createComputed<Val>(
   cb: (val?: Val) => Val,
   init?: Val
): void {
   const computed = createComputation(cb, init, true, STALE)
   updateComputation(computed)
}
