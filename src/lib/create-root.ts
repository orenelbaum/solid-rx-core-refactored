import { state, runUpdates, cleanNode, withState, Owner, UNOWNED } from '.'


// Short description: Runs the callback with `runUpdate`, with itself as the owner and
// no listener.

// Creates a root object and assigns it as the owner.
// It also resets the listening computation (to none)
//
// It then passes the callback to `runUpdates`.
// It binds a dispose argument to the callback which will clean the root
// object with the `cleanNode` function.
export function createRoot<CbResult>(
   cb: (dispose: () => void) => CbResult,
   detachedOwner?: Owner
): CbResult {
   if (detachedOwner) state.owner = detachedOwner

	const root: Owner = cb.length === 0
		? UNOWNED
		: { 
			ownedComputations: null,
			cleanupCbs: null,
			context: null,
			owner: state.owner
		}

	return withState(
		{ owner: root, listener: null },
		() => {
			runUpdates(
				() => cb(() => cleanNode(root)),
				true
			)
		}
	)
}
