export type Setter<Value> = undefined extends Value
   ? 
      <U extends Value>(
         value?: 
            | (U extends Function ? never : U)
            | ((prev?: Value) => U)
      ) => U
   : 
      <U extends Value>(
         value: 
            | (U extends Function ? never : U)
            | ((prev: Value) => U)
      ) => U