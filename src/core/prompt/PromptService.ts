import inquirer from "inquirer";
import { PromptType } from "./PromptTypes";
import { PromptOptions } from "./PromptOptions";

export class PromptService {
  public async input<T = string>(message: string, type: PromptType, options?: PromptOptions): Promise<T> {
    return (
      await inquirer.prompt<{ result: T }>([
        {
          type,
          name: "result",
          message,
          default: options?.defaultValue,
          choices: options?.choices,
        },
      ])
    ).result;
  }
}
