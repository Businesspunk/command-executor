export class CommandBuilder {
  private options: Map<string, string | null> = new Map();

  public constructor(private commandName: string) {}

  public setOption(name: string, value: string | null = null): this {
    this.options.set(name, value);
    return this;
  }

  public build(): string {
    let result = "";
    this.options.forEach((value, key) => {
      result += " " + key;
      if (value != null) {
        result += " " + value;
      }
    });
    return this.commandName + result;
  }
}
