import { state } from '../../shared/state'
import { subscribeListenerToSig } from './subscribe-listener-to-sig'
import { sigIsMemoWithSourcesArray } from '../../memo/type-guards/sig-is-memo-with-sources-array.type-guard'
import type { Sig } from '../signal.interface'
import type { Memo } from '../../memo/memo.interface'
import { readMemo } from '../../memo/read-memo'


export function readSig(sig: Sig<any> | Memo<any>) {
   if (sigIsMemoWithSourcesArray(sig)) readMemo(sig)

   if (state.listener) subscribeListenerToSig(sig)

   return sig.val
}
