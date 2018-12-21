/**
 * A node of a doubly linked list.
 *
 * @author Giancarlo Dalle Mole
 * @since 21/12/2018
 */
export class DoublyLinkedListNode<K = any, V = any> {

    //#region Public Attributes
    /**
     * The key of this doubly linked list node
     */
    public key: K;
    /**
     * The value of this doubly linked list node
     */
    public value: V;
    //#endregion

    //#region Private Attributes
    /**
     * The previous node of this doubly linked list node
     */
    private prev: DoublyLinkedListNode;
    /**
     * The next node of this doubly linked list node
     */
    private next: DoublyLinkedListNode;
    //#endregion

    //#region Constructor
    constructor(key: K, value: V) {

        this.key = key;
        this.value = value;

        this.prev = null;
        this.next = null;
    }
    //#endregion

    //#region Public Methods
    /**
     * Set privious node info
     * @param node
     */
    public setPrev(node: DoublyLinkedListNode): void {
        this.prev = node;
    }

    /**
     * Set next node info
     * @param node
     */
    public setNext(node: DoublyLinkedListNode): void {
        this.next = node;
    }

    /**
     * Get previous node
     * @return previous node
     */
    public getPrev(): DoublyLinkedListNode {
        return this.prev;
    }

    /**
     * Get next node
     * @return {Node} next node
     */
    public getNext(): DoublyLinkedListNode {
        return this.next;
    }
    //#endregion
}
