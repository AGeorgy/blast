import { Component, Node, Prefab } from "cc";
import { PooledObject } from "./PooledObject";
import { IReturn } from "./IReturn";

export class ObjectPool<T extends Component> implements IReturn<T> {
    private prefab: Prefab;
    private parent: Node;
    private pooledObjects: PooledObject<T>[] = [];
    private componentName: string;

    constructor(prefab: Prefab, parent: Node, defaultPoolCount: number, componentName: string) {
        this.prefab = prefab;
        this.parent = parent;
        this.componentName = componentName;

        for (let i = 0; i < defaultPoolCount; i++) {
            this.createNew();
        }
    }

    borrow(): T {
        const objectToBorrow: PooledObject<T> | null = this.pooledObjects.find((o) => !o.IsBorrowed);
        if (objectToBorrow != null) {
            return objectToBorrow.borrow();
        }

        return this.createNew().borrow();
    }

    return(object: T): void {
        const objectToReturn: PooledObject<T> | null = this.pooledObjects.find((o) => o.Equals(object));
        if (objectToReturn == null) {
            throw new Error("Object " + this.prefab.name + " is not a member of the pool");
        }

        objectToReturn.return();
    }

    private createNew(): PooledObject<T> {
        const newPooledObject: PooledObject<T> = new PooledObject(this.prefab, this.parent, this.componentName);
        this.pooledObjects.push(newPooledObject);

        return newPooledObject;
    }
}