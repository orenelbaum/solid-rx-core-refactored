import type { Computation, Memo } from "../.."


export function computationIsMemoWithObserversArray<Value>(
   computation: Computation<Value>
): computation is Memo<Value> {
   return !!(computation as Memo<any>).observers
}
