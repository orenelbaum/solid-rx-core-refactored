import { NOT_PENDING, equalFn } from '..'
import { readSig, writeToSig } from "."
import type { Sig, Accessor, Setter } from '..'


export function createSignal<Val>(
   val?: Val,
   options?: {
		equals?: 
			| false
			| ((prev: Val, next: Val) => boolean)
	}
): [
	get: Accessor<Val>, set: Setter<Val>
] {
   const sig: Sig<Val> = {
		val,
		observers: null,
		observerSlots: null,
		pendingVal: NOT_PENDING,
		comparator: options?.equals || equalFn
   }
 
   return [
		() => readSig(sig),
		(
			(val: Val) => {
				if (typeof val === "function")
					val = val(
						// If running inside batch and there's already a pending value, the
						// pending value will be overwritten. The overriding pending value
						// will be a function of the current pending value.
						sig.pendingVal !== NOT_PENDING
							? sig.pendingVal
							: sig.val
					)
				
				return writeToSig(sig, val)
			}
		) as Setter<Val>
   ]
}
