# Solid RX core refactored

This is a refactored version of the core of Solid's reactive system. I made it for learning the codebase myself, but thought it might be useful for others.
This version has documentation, as well as a lot of small refactorings like different variable names, however it's still equivalent to the original code.
This codebase includes some the functions from [Solid's `signal.ts` file](https://github.com/solidjs/solid/blob/main/packages/solid/src/reactive/signal.ts). All of the code for suspense and scheduling was removed from inside the functions, the same as Rollup will do if you don't use those features. I also removed all dev mode and error handling code.
