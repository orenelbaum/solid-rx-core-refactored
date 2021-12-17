import { updateComputation, createComputation, STALE } from '.'


export function createRenderEffect<Val>(
   cb: (val?: Val) => Val,
   init?: Val
): void {
   const renderEffect = createComputation(cb, init, false, STALE)
   updateComputation(renderEffect)
}