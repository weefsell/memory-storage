import { DoublyLinkedListNode } from "./doubly-linked-list-node";

/**
 * A doubly linked list
 *
 * @author Giancarlo Dalle Mole
 * @since 21/12/2018
 */
export class DoublyLinkedList<K = any, V = any> {

    //#region Private Attributes
    /**
     * The head node
     */
    private head: DoublyLinkedListNode<K, V>;
    /**
     * The tail node
     */
    private tail: DoublyLinkedListNode<K, V>;
    /**
     * The maximum maxSize of the linked list
     */
    private _maxSize: number;
    /**
     * The current maxSize of the linked list
     */
    private _size: number;
    //#endregion

    //#region Constructor
    constructor(size: number) {

        this._maxSize = size;

        this._size = 0;
        this.head = null;
        this.head = null;
    }
    //#endregion

    //#region Getters
    /**
     * The maximum maxSize of the linked list
     */
    public get maxSize(): number {
        return this._maxSize;
    }
    /**
     * The current size of the linked list
     */
    public get size(): number {
        return this._size;
    }
    //#endregion

    //#region Public Methods
    /**
     * Add node to double link list.
     * @return {Node}
     */
    public addNodeToList(key: K, value: V): DoublyLinkedListNode<K, V> {

        const node: DoublyLinkedListNode<K, V> = new DoublyLinkedListNode(key, value);

        if (this.head == null || this._maxSize === 1) {

            this.head = node;
            this.tail = node;
            this._size = 1;

            return node;
        }
        else if (this._size < this._maxSize) {

            this._size += 1;
        }
        else {

            this.tail = this.tail.getPrev();

            if (this.tail != null) {
                this.tail.setNext(null);
            }
        }

        this.tail.setNext(node);
        node.setPrev(this.tail);
        this.tail = node;

        return node;
    }

    /**
     * Move node to link list head
     * @param node The node to be moved
     */
    public movePageToHead(node: DoublyLinkedListNode<K, V>) {

        if (node == null || node === this.head) {
            return;
        }

        if (node === this.tail) {

            this.tail = this.tail.getPrev();
            this.tail.setNext(null);
        }

        const prev: DoublyLinkedListNode<K, V> = node.getPrev();
        const next: DoublyLinkedListNode<K, V> = node.getNext();
        prev.setNext(next);

        if (next != null) {
            next.setPrev(prev);
        }

        node.setPrev(null);
        node.setNext(this.head);
        this.head.setPrev(node);
        this.head = node;
    }

    /**
     * Get link list head.
     * @return The head node
     */
    public getHead(): DoublyLinkedListNode<K, V> {
        return this.head;
    }

    /**
     * Get link list tail.
     * @return The tail node
     */
    public getTail(): DoublyLinkedListNode<K, V> {
        return this.tail;
    }
    //#endregion
}
