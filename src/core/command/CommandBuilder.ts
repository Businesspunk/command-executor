import { CommandPresenterInterface } from "./CommandPresenterInterface";

export class CommandBuilder {
  private options: Map<string, string | null> = new Map();

  public constructor(private readonly commandName: string) {}

  public setOption(name: string, value: string | null = null): this {
    this.options.set(name, value);
    return this;
  }

  public build(): CommandPresenterInterface {
    let params: string[] = [];
    this.options.forEach((value, key) => {
      let option = key;
      if (value != null) {
        option += " " + value;
      }
      params.push(option);
    });

    return {
      name: this.commandName,
      params,
    };
  }
}
