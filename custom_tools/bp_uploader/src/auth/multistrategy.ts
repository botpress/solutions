export class AbstractMultiStrategy<T> {
  protected _strategies = new Map<string, T>();
  registerStrategy(name: string, handler: T): void {
    this._strategies.set(name, handler);
  }
}
