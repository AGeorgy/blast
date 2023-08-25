interface IGameStateSwitcher {
    nextState(callback?: () => void): void;
}