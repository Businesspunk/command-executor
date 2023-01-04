import { CommandPresenterInterface } from "./interface/CommandPresenterInterface";
import { CommandOperator } from "./CommandOperator";
import { CommandValueItemInterface } from "./interface/CommandValueItemIterface";

export class CommandBuilder {
  private options: Map<string, CommandValueItemInterface | null> = new Map();

  public constructor(private readonly commandName: string) {}

  public setOption(
    name: string,
    value: string | null = null,
    operator: CommandOperator | null = null
  ): this {
    if (value) {
      this.options.set(name, { value, operator });
    } else {
      this.options.set(name, null);
    }
    return this;
  }

  public build(): CommandPresenterInterface {
    let params: string[] = [];
    this.options.forEach((valueItem: CommandValueItemInterface | null, key) => {
      let option = key;
      if (valueItem != null) {
        option += (valueItem.operator ?? " ") + valueItem.value;
      }
      params.push(option);
    });

    return {
      name: this.commandName,
      params,
    };
  }
}
