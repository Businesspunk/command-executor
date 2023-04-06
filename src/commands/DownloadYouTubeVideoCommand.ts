import { injectable } from "tsyringe";
import { Command } from "../core/command/Command";
import { CommandBuilder } from "../core/command/CommandBuilder";
import { CommandExecutor } from "../core/command/CommandExecutor";
import { PromptService } from "../core/prompt/PromptService";
import { PromptType } from "../core/prompt/PromptTypes";
import { YoutubeVideoQualityResolution } from "./enum/YoutubeVideoQualityResolution";
import { Path } from "../core/storage/Path";

@injectable()
export class DownloadYouTubeVideoCommand extends Command {
  protected readonly name = "yt-dlp";

  public constructor(
    private readonly promptService: PromptService,
    protected readonly executor: CommandExecutor,
    protected readonly commandBuilder: CommandBuilder,
    private readonly path: Path
  ) {
    super();
    commandBuilder.setName(this.name);
  }

  protected async promptParameters(): Promise<void> {
    const videoUrl = await this.promptService.input("Youtube video URL", PromptType.Input);
    this.commandBuilder.setOption("-o", this.path.makePathToPublicUserVolume("%(title)s.%(ext)s"));
    this.commandBuilder.setOption(videoUrl);

    const quality = await this.promptService.input("Choose Quality", PromptType.List, {
      choices: Object.values(YoutubeVideoQualityResolution),
    });

    const extension = "ext:mp4:m4a";
    switch (quality) {
      case YoutubeVideoQualityResolution.Regular:
        this.commandBuilder.setOption("-S", [extension, "res:720"].join(","));
        break;
      case YoutubeVideoQualityResolution.High:
        this.commandBuilder.setOption("-S", [extension, "res:1080"].join(","));
        break;
      default:
        this.commandBuilder.setOption("-S", extension);
    }
  }

  public getDescription(): string {
    return "Youtube Video Downloader";
  }
}
