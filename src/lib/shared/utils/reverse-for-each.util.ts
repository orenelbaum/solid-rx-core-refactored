
export const reverseForEach = <Val>(
   array: Array<Val>,
   cb: (val: Val) => any
) => {
   for (let i = array.length - 1; i >= 0; i--)
      cb(array[i])
}