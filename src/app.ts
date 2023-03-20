import "reflect-metadata";
import { container } from "tsyringe";
import { injectable } from "tsyringe";
import { PromptService } from "./core/prompt/PromptService";
import { PromptType } from "./core/prompt/PromptTypes";
import { Command } from "./core/command/Command";
import { sprintf } from "sprintf-js";
import { AppCommands } from "./commands/AppComands";

@injectable()
class App {
  public constructor(private readonly promptService: PromptService, private readonly appCommands: AppCommands) {}

  public async run(): Promise<void> {
    const choosedOption = await this.promptService.input<{ command: Command }>("Choose command", PromptType.List, {
      choices: this.appCommands.getCommands().map((command: Command) => {
        return {
          name: sprintf("%s (%s)", command.getName(), command.getDescription()),
          value: { command },
        };
      }),
    });

    choosedOption.command.run();
  }
}

container.resolve(App).run();
