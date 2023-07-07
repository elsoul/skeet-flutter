import adaptor from '../adaptor';
import { unwrapData } from '../data';
/**
 * Updates a document.
 *
 * ```ts
 * import { update, field, collection } from 'typesaurus'
 *
 * type User = {
 *   name: string,
 *   address: {
 *     country: string,
 *     city: string
 *   }
 * }
 *
 * const users = collection<User>('users')
 *
 * update(users, '00sHm46UWKObv2W7XK9e', { name: 'Sasha Koss' })
 *   .then(() => console.log('Done!'))
 * // or using key paths:
 * update(users, '00sHm46UWKObv2W7XK9e', [
 *   field('name', 'Sasha Koss'),
 *   field(['address', 'city'], 'Moscow')
 * ])
 * ```
 *
 * @returns A promise that resolves when the operation is finished
 */
async function update(collectionOrRef, idOrData, maybeData) {
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
    const firebaseDoc = a.firestore.collection(collection.path).doc(id);
    const updateData = Array.isArray(data)
        ? data.reduce((acc, { key, value }) => {
            acc[Array.isArray(key) ? key.join('.') : key] = value;
            return acc;
        }, {})
        : data;
    await firebaseDoc.update(unwrapData(a, updateData));
}
export default update;
//# sourceMappingURL=index.js.map