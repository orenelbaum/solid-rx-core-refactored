import { READY } from ".."
import type { Computation } from "."


export const computationIsReady = (computation: Computation<any>) =>
   computation.state === READY
