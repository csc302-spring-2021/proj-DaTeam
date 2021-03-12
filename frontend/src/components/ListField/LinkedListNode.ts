/**
 * A linked list node to store previous values
 * @param  {[type]} value [description]
 * @param  {[type]} next [description]
 * @param  {[type]} prev [description]
 */
export class LinkedListNode<T> {
  private value: T;
  private next?: LinkedListNode<T>;
  private prev?: LinkedListNode<T>;

  constructor(value: T, next?: LinkedListNode<T>, prev?: LinkedListNode<T>) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }

  public getValue() {
    return this.value;
  }

  public getNext() {
    return this.next;
  }

  public getPrev() {
    return this.prev;
  }

  public setNext(node: LinkedListNode<T> | undefined) {
    this.next = node;
  }

  public setPrev(node: LinkedListNode<T>) {
    this.prev = node;
  }
}
