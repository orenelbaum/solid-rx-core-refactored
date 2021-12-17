import type { Computation, Memo } from "../.."


export function computationIsMemoWithObservers<Val>(
   computation: Computation<Val>
): computation is Memo<Val>{
   return !!(computation as Memo<any>).observers?.length
}
