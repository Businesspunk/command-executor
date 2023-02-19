import { CommandPresenterInterface } from "./interface/CommandPresenterInterface";
import { CommandOperator } from "./CommandOperator";
import { CommandValueItemInterface } from "./interface/CommandValueItemIterface";

export class CommandBuilder {
  private commandName: string;
  private options: Map<string, CommandValueItemInterface | null> = new Map();

  public setName(commandName: string): this {
    this.commandName = commandName;
    return this;
  }

  public setOption(name: string, value: string | null = null, operator: CommandOperator | null = null): this {
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
      if (valueItem != null && valueItem.operator) {
        params.push(key + valueItem.operator + valueItem.value);
        return;
      }

      if (valueItem?.value && valueItem.operator === null) {
        params.push(key, valueItem.value);
        return;
      }

      if (valueItem == null) {
        params.push(key);
      }
    });

    return { name: this.commandName, params };
  }

  public getName(): string {
    return this.commandName
  }
}
