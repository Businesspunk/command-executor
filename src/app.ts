import "reflect-metadata";
import { container } from "tsyringe";
import { injectable } from "tsyringe";
import { CommpressVideoCommand } from "./commands/CompressVideoCommand";
import { PromptService } from "./core/prompt/PromptService";
import { PromptType } from "./core/prompt/PromptTypes";

@injectable()
class App {
  public constructor(
    private readonly promptService: PromptService,
    private readonly commpressVideoCommand: CommpressVideoCommand
  ) {}

  public async run(): Promise<void> {
    const command = await this.promptService.input("Choose command", PromptType.List, {
      choices: [this.commpressVideoCommand.getName()],
    });

    switch (command) {
      case this.commpressVideoCommand.getName():
        this.commpressVideoCommand.run();
        break;
    }
  }
}

container.resolve(App).run();
