import type { Owner, Computation } from '..'


export function nodeIsComputationWithSources(
   node: Owner
): node is Computation<any> {
   return !!(node as Computation<any>).sources
}
