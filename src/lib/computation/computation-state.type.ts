import { READY, STALE, PENDING } from '..'


export type ComputationState =
   | typeof READY
   | typeof STALE
   | typeof PENDING
