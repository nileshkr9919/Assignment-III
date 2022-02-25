export default interface ICrud<T> {
    create(item: T): void;
    read(): T[];
    update(item: T): void;
    delete(item: T): void;

}