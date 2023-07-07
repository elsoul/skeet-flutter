/**
 * Creates a field object. It's used to update nested maps.
 *
 * ```ts
 * import { field, update, collection } from 'typesaurus'
 *
 * type User = { name: string }
 * const users = collection<User>('users')
 *
 * update(users, '00sHm46UWKObv2W7XK9e', [
 *   field('name', 'Sasha Koss'),
 *   field(['address', 'city'], 'Dimitrovgrad')
 * ])
 * //=> Promise<void>
 * ```
 *
 * @param key - The field key or key path
 * @param value - The value
 * @returns The field object
 */
function field(key, value) {
    return { key, value };
}
export default field;
//# sourceMappingURL=index.js.map