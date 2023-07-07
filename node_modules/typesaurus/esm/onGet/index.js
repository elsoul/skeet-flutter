import adaptor from '../adaptor';
import { wrapData } from '../data';
import { doc } from '../doc';
import { ref } from '../ref';
/**
 * Subscribes to the given document.
 *
 * ```ts
 * import { onGet, collection } from 'typesaurus'
 *
 * type User = { name: string }
 * const users = collection<User>('users')
 *
 * onGet(users, '00sHm46UWKObv2W7XK9e', sasha => {
 *   console.log(sasha.ref.id)
 *   //=> '00sHm46UWKObv2W7XK9e'
 *   console.log(sasha.data)
 *   //=> { name: 'Sasha' }
 * })
 * ```
 *
 * @returns Function that unsubscribes the listener from the updates
 */
export default function onGet(collectionOrRef, idOrOnResult, onResultOrOnError, maybeOnError) {
    let unsubCalled = false;
    let firebaseUnsub;
    const unsub = () => {
        unsubCalled = true;
        firebaseUnsub && firebaseUnsub();
    };
    let collection;
    let id;
    let onResult;
    let onError;
    if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef;
        id = idOrOnResult;
        onResult = onResultOrOnError;
        onError = maybeOnError;
    }
    else {
        const ref = collectionOrRef;
        collection = ref.collection;
        id = ref.id;
        onResult = idOrOnResult;
        onError = onResultOrOnError;
    }
    adaptor().then((a) => {
        if (unsubCalled)
            return;
        const firestoreDoc = a.firestore.collection(collection.path).doc(id);
        firebaseUnsub = firestoreDoc.onSnapshot((snap) => {
            const firestoreData = snap.data();
            const data = firestoreData && wrapData(a, firestoreData);
            onResult((data && doc(ref(collection, id), data, a.getDocMeta(snap))) || null);
        }, onError);
    });
    return unsub;
}
//# sourceMappingURL=index.js.map