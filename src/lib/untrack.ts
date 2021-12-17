import { withState } from '.'
import type { Accessor } from '.'


export function untrack<Val>(
   cb: Accessor<Val>
): Val {
   return withState(
      { listener: null },
      cb
   )
}
