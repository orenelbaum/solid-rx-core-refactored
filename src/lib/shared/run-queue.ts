import { Computation } from ".."
import { runTop } from "."


export function runQueue(queue: Computation<any>[]) {
   for (const computation of queue) runTop(computation)
}
