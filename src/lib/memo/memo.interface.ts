import type { Computation } from ".."
import type { Sig } from '..'


export interface Memo<T> extends Sig<T>, Computation<T> {}
