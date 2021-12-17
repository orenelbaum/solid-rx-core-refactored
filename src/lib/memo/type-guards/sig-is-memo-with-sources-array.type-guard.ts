import type { Sig, Memo } from "../.."


export function sigIsMemoWithSourcesArray<Value>(
   source: Sig<Value>
): source is Memo<Value> {
   return !!(source as Memo<Value>).sources
}
