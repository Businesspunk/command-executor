import { injectable } from "tsyringe";
import { Command } from "../core/command/Command";
import { CommandBuilder } from "../core/command/CommandBuilder";
import { CommandExecutor } from "../core/command/CommandExecutor";
import { PromptService } from "../core/prompt/PromptService";
import { PromptType } from "../core/prompt/PromptTypes";
import { Path } from "../core/filesystem/Path";

@injectable()
export class DownloadYouTubeAudioCommand extends Command {
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
    this.commandBuilder.setOption(videoUrl).setOption("-x").setOption("--audio-format", "mp3");
  }

  public getDescription(): string {
    return "Youtube Audio Downloader";
  }
}
