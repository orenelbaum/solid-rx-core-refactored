import { createComputation, updateComputation } from "../computation"
import { readSig, equalFn, NOT_PENDING, READY } from '..'
import type { Accessor, Memo } from ".."


export function createMemo<Val>(
	cb: (val?: Val) => Val,
	init?: Val,
	options?: { equals?: false | ((prev: Val, next: Val) => boolean) }
): Accessor<Val> {
	const memo = createComputation<Val>(
		cb,
		init,
		true,
		READY
	) as Memo<Val>

	memo.pendingVal = NOT_PENDING
	memo.observers = null
	memo.observerSlots = null
	memo.comparator = options?.equals || equalFn

	// Create memo, unlike create effect, runs immediately 
	updateComputation(memo)
	
	return () => readSig(memo)
}
