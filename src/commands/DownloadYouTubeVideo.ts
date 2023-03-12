import { injectable } from "tsyringe";
import { Command } from "../core/command/Command";
import { CommandBuilder } from "../core/command/CommandBuilder";
import { CommandExecutor } from "../core/command/CommandExecutor";
import { PromptService } from "../core/prompt/PromptService";
import { PromptType } from "../core/prompt/PromptTypes";
import { YoutubeVideoQualityResolution } from "./enum/YoutubeVideoQualityResolution";

@injectable()
export class DownloadYouTubeVideo extends Command {
  protected readonly name = "yt-dlp";

  public constructor(
    private readonly promptService: PromptService,
    protected readonly executor: CommandExecutor,
    protected readonly commandBuilder: CommandBuilder
  ) {
    super();
    commandBuilder.setName(this.name);
  }

  protected async promptParameters(): Promise<void> {
    const videoUrl = await this.promptService.input("Youtube video URL", PromptType.Input);
    this.commandBuilder.setOption(videoUrl);

    const quality = await this.promptService.input("Choose Quality", PromptType.List, {
      choices: Object.values(YoutubeVideoQualityResolution),
    });

    switch (quality) {
      case YoutubeVideoQualityResolution.Regular:
        this.commandBuilder.setOption("-S", "res:720");
        break;
      case YoutubeVideoQualityResolution.High:
        this.commandBuilder.setOption("-S", "res:1080");
        break;
    }
  }

  public getDescription(): string {
    return "Youtube Video Downloader";
  }
}
