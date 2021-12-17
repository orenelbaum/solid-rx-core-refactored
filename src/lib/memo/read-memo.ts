import { computationIsReady, updateComputation } from '../computation'
import { withState, updateUpstreamMemos, STALE } from '../shared'
import type { Memo } from "./memo.interface"


// If the memo is stale it will get updated.
// If the memo is pending upstream memos will be updaeted.
export function readMemo(memo: Memo<any>) {
   if (!computationIsReady(memo)) {
      withState(
         { updates: null },
         () => {
            if (memo.state === STALE) updateComputation(memo)
            else updateUpstreamMemos(memo)
         }
      )
   }
}
