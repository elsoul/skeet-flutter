import adaptor from '../adaptor';
import { wrapData } from '../data';
import { doc } from '../doc';
import { ref } from '../ref';
/**
 * Retrieves a document from a collection.
 *
 * ```ts
 * import { get, collection } from 'typesaurus'
 *
 * type User = { name: string }
 * const users = collection<User>('users')
 *
 * get(users, '00sHm46UWKObv2W7XK9e').then(user => {
 *   console.log(user)
 *   //=> { __type__: 'doc', data: { name: 'Sasha' }, ... }
 * })
 * // Or using ref:
 * get(currentUser.ref)
 * ```
 *
 * @returns Promise to the document or null if not found
 */
async function get(collectionOrRef, maybeId) {
    const a = await adaptor();
    let collection;
    let id;
    if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef;
        id = maybeId;
    }
    else {
        const ref = collectionOrRef;
        collection = ref.collection;
        id = ref.id;
    }
    const firestoreDoc = a.firestore.collection(collection.path).doc(id);
    const firestoreSnap = await firestoreDoc.get();
    const firestoreData = firestoreSnap.data();
    const data = firestoreData && wrapData(a, firestoreData);
    return data
        ? doc(ref(collection, id), data, a.getDocMeta(firestoreSnap))
        : null;
}
export default get;
//# sourceMappingURL=index.js.map