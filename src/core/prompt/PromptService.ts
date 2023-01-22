import inquirer from "inquirer";
import { PromptType } from "./PromptTypes";

export class PromptService {
  public async input<T>(message: string, type: PromptType, defaultValue: number|string|null = null): Promise<T> {
    return (
      await inquirer.prompt<{ result: T }>([{ type, name: "result", message, default: defaultValue }])
    ).result;
  }
}
