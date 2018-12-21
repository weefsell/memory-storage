/**
 * Base interface for memory storages.
 *
 * @author Giancarlo Dalle Mole
 * @since 21/12/2018
 */
export interface IMemoryStorage {

    /**
     * Get value from cache via key.
     * @param key The key identifying the object in the cache
     * @return A value or undefined if not present.
     */
    get<K = any, V = any>(key: K): V;

    /**
     * Get the max cache maxSize (maximum number of objects that can be stores).
     * @return The maximum maxSize
     */
    getMaxSize(): number;

    /**
     * Get the current cache maxSize (current number of objects stored).
     * @return The current cache maxSize.
     */
    getSize(): number;

    /**
     * Set K and V to cache
     * @param key The key identifying the object in the cache
     * @param value The value of the cache
     */
    set<K = any, V = any>(key: K, value: V): void;
}

export const IMemoryStorage: symbol = Symbol("IMemoryStorage");
