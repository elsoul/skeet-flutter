import adaptor from '../adaptor';
import { unwrapData } from '../data';
/**
 * Sets a document to the given data.
 *
 * ```ts
 * import { set, get, collection } from 'typesaurus'
 *
 * type User = { name: string }
 * const users = collection<User>('users')
 *
 * const userId = '00sHm46UWKObv2W7XK9e'
 * await set(users, userId, { name: 'Sasha Koss' })
 * console.log(await get(users, userId))
 * //=> { name: 'Sasha Koss' }
 * ```
 */
async function set(collectionOrRef, idOrData, maybeData) {
    const a = await adaptor();
    let collection;
    let id;
    let data;
    if (collectionOrRef.__type__ === 'collection') {
        collection = collectionOrRef;
        id = idOrData;
        data = maybeData;
    }
    else {
        const ref = collectionOrRef;
        collection = ref.collection;
        id = ref.id;
        data = idOrData;
    }
    const firestoreDoc = a.firestore.collection(collection.path).doc(id);
    await firestoreDoc.set(unwrapData(a, data));
}
export default set;
//# sourceMappingURL=index.js.map