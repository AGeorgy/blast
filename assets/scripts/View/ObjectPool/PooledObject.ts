import { Component, instantiate, Node, Prefab } from "cc";

export class PooledObject<T extends Component> {
    private isBorrowed = false;
    private defaultParent: Node;
    private instancedNode: Node;
    private instancedComponent: T;

    constructor(prefab: Prefab, defaultParent: Node, componentName: string) {
        this.defaultParent = defaultParent;

        this.instancedNode = instantiate(prefab);
        this.instancedComponent = <T>this.instancedNode.getComponent(componentName);
        if (this.instancedComponent == null) {
            console.error("Object " + prefab.name + " does not have component " + componentName);
        }

        this.clear();
    }

    get IsBorrowed(): boolean {
        return this.isBorrowed;
    }

    Equals(component: T): boolean {
        return this.instancedComponent == component;
    }

    borrow(): T {
        this.isBorrowed = true;
        return this.instancedComponent;
    }

    return(): void {
        this.clear();
    }

    private clear(): void {
        this.instancedNode.active = false;
        this.instancedNode.parent = this.defaultParent;
        this.isBorrowed = false;
    }
}