import { Computation } from ".."


export interface Owner {
   ownedComputations: Computation<any>[] | null
   cleanupCbs: (() => void)[] | null
   owner: Owner | null
   context: any | null
   sourceMap?: Record<string, { value: unknown }>
}
