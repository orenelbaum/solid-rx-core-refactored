import { Owner } from "."


export const equalFn = <T>(a: T, b: T) => a === b

export const $PROXY = Symbol("solid-proxy")

export const signalOptions = { equals: equalFn }

// A possible value for signal.pendingValue
export const NOT_PENDING = {}


// Possible values for computation.state

export const READY = 0

// All effects are created stale.
// User effects become stale once one of their sources has been written to.
export const STALE = 1

// Effects that might potentially be stale.
export const PENDING = 2


export const UNOWNED: Owner = {
   ownedComputations: null,
   cleanupCbs: null,
   context: null,
   owner: null
}
