import { IMemoryStorage } from "../common";

/**
 * Memory storage based on the LRU algorithm cache policy.
 *
 * @author Giancarlo Dalle Mole
 * @since 21/12/2018
 */
export interface ILruMemoryStorage extends IMemoryStorage {

    /**
     * Set K and V to cache with an expiration time (seconds).
     * @param key The key identifying the object in the cache
     * @param value The value of the cache
     * @param expire The expire time in seconds
     */
    setWithExpiration<K = any, V = any>(key: K, value: V, expire: number): void;

    /**
     * Push value to named key's array.
     * @param key The key identifying the object in the cache
     * @param value The value of the cache
     */
    rpush<K = any, V = any>(key: K, value: V): void;

    /**
     * Pop value from named key's array and return it.
     * @param key The key identifying the object in the cache
     */
    rpop<K = any, V = any>(key: K): V;

    /**
     * Set expire time for key.
     * @param key The key identifying the object in the cache
     * @param expire The expire time in seconds
     */
    expire<K = any>(key: K, expire: number): void;
}

export const ILruMemoryStorage: symbol = Symbol("ILruMemoryStorage");
