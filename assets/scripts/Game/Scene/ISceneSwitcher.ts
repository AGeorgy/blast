interface ISceneSwitcher {
    switchScene(sceneName: string, callback?: () => void): void;
}