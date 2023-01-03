import inquirer from "inquirer";
import { PromptType } from "./PromptTypes";

export class Prompt {
  public async input<T>(message: string, type: PromptType): Promise<T> {
    return (
      await inquirer.prompt<{ result: T }>([{ type, name: "result", message }])
    ).result;
  }
}
