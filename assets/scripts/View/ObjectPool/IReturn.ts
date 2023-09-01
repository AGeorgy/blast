import { Component } from "cc";

export interface IReturn<T extends Component> {
    return(object: T): void;
}