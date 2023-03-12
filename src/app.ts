import "reflect-metadata";
import { container } from "tsyringe";
import { injectable } from "tsyringe";
import { CommpressVideoCommand } from "./commands/CompressVideoCommand";
import { DownloadYouTubeVideo } from "./commands/DownloadYouTubeVideo";
import { PromptService } from "./core/prompt/PromptService";
import { PromptType } from "./core/prompt/PromptTypes";
import { Command } from "./core/command/Command";
import { sprintf } from "sprintf-js";

@injectable()
class App {
  private commands: Command[] = [];

  public constructor(
    private readonly promptService: PromptService,
    commpressVideoCommand: CommpressVideoCommand,
    youtubeVideoDownloader: DownloadYouTubeVideo
  ) {
    this.commands.push(commpressVideoCommand, youtubeVideoDownloader);
  }

  public async run(): Promise<void> {
    const choosedOption = await this.promptService.input<{ command: Command }>("Choose command", PromptType.List, {
      choices: this.commands.map((command: Command) => {
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
