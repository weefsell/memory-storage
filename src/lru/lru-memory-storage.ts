import { ILruMemoryStorage } from "./lru-memory-storage.interface";
import { DoublyLinkedList, DoublyLinkedListNode } from "../common";

/**
 * Concrete implementation of {@link ILruMemoryStorage}
 *
 * @author Giancarlo Dalle Mole
 * @since 21/12/2018
 */
export class LruMemoryStorage implements ILruMemoryStorage {

    //#region Private Static Attributes
    /**
     * The default maxSize of the LRU Memory Storage
     */
    private static readonly DEFAULT_SIZE: number = 100;
    //#endregion

    //#region Private Attributes
    /**
     * The maximum maxSize of the LRU memory storage
     */
    private maxSize: number;
    /**
     * The map of K, V that actually is the cache
     */
    private cache: Map<any, any>;
    /**
     * A map of timers
     */
    private timer: Map<any, any>;
    /**
     * The internal used doubly linked list
     */
    private doubleLinkList: DoublyLinkedList<any, any>;
    //#endregion

    //#region Constructor
    constructor(maxSize: number = LruMemoryStorage.DEFAULT_SIZE) {

        this.maxSize = maxSize;

        this.cache = new Map<any, any>();
        this.timer = new Map<any, number>();
        this.doubleLinkList = new DoublyLinkedList<any, any>(maxSize)
    }
    //#endregion

    //#region Memory Storage Interface Methods
    /**
     * @inheritDoc
     */
    public get<K = any, V = any>(key: K): V {

        const node = this.cache.get(key);
        if (node != null) {

            this.doubleLinkList.movePageToHead(node);
            return node.value;
        }

        return undefined;
    }

    /**
     * @inheritDoc
     */
    public getMaxSize(): number {
        return this.maxSize;
    }

    /**
     * @inheritDoc
     */
    public getSize(): number {
        return this.cache.size;
    }

    /**
     * @inheritDoc
     */
    public set<K = any, V = any>(key: K, value: V): void {

        if (this.cache.has(key)) {

            const node = this.cache.get(key);
            node.value = value;
            this.cache.set(key, node);
            this.doubleLinkList.movePageToHead(node);
        }
        else {
            // Check whether current size is equal to total size or not.
            this.eliminate();
            const newNode = this.doubleLinkList.addNodeToList(key, value);
            this.cache.set(key, newNode);
        }
    }
    //#endregion

    //#region LRU Memory Storage Interface Methods
    /**
     * @inheritDoc
     */
    public expire<K = any>(key: K, expire: number): void {

        if (this.cache.has(key)) {

            const currTimer = this.timer.get(key);
            if (currTimer) {
                clearTimeout(currTimer);
            }

            this.timer.set(key, setTimeout(() => {

                this.cache.delete(key);
                this.timer.delete(key);

            }, expire));
        }
    }

    /**
     * @inheritDoc
     */
    public rpop<K = any, V = any>(key: K): V {

        const node = this.cache.get(key);

        if (node != null) {

            if (Array.isArray(node.value)) {
                let rst = node.value.pop();
                this.doubleLinkList.movePageToHead(node);
                return rst;
            }

            throw new Error('Invalid type, value must be an array');
        }
        return null;
    }

    /**
     * @inheritDoc
     */
    public rpush<K = any, V = any>(key: K, value: V): void {

        if (this.cache.has(key)) {

            const node = this.cache.get(key);
            node.value.push(value);
            this.cache.set(key, node);
            this.doubleLinkList.movePageToHead(node);
        }
        else {

            // Check whether current size is equal to total size or not.
            this.eliminate();
            let newNode = this.doubleLinkList.addNodeToList(key, [value]);
            this.cache.set(key, newNode);
        }
    }

    /**
     * @inheritDoc
     */
    public setWithExpiration<K = any, V = any>(key: K, value: V, expire: number): void {

        this.set(key, value);

        setTimeout(() => {
            this.cache.delete(key);
        }, expire);
    }
    //#endregion

    //#region Private Methods
    /**
     * Elimination. The code as LRU algorithm.
     */
    private eliminate(): void {

        if (this.doubleLinkList.size === this.doubleLinkList.maxSize) {

            // Elimination the tail node.
            const tmpNode: DoublyLinkedListNode<any, any> = this.doubleLinkList.getTail();
            this.cache.delete(tmpNode.key);
        }
    }
    //#endregion
}
