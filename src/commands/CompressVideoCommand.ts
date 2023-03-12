import { injectable } from "tsyringe";
import { Command } from "../core/command/Command";
import { CommandOperator } from "../core/command/CommandOperator";
import { PromptService } from "../core/prompt/PromptService";
import { PromptType } from "../core/prompt/PromptTypes";
import { CommandExecutor } from "../core/command/CommandExecutor";
import { CommandBuilder } from "../core/command/CommandBuilder";

@injectable()
export class CommpressVideoCommand extends Command {
  protected readonly name = "ffmpeg";

  public constructor(
    private readonly promptService: PromptService,
    protected readonly executor: CommandExecutor,
    protected readonly commandBuilder: CommandBuilder
  ) {
    super();
    commandBuilder.setName(this.name);
  }

  protected async promptParameters(): Promise<void> {
    const pathToVideo = await this.promptService.input("Path to video", PromptType.Input);

    const width = await this.promptService.input<number>("Width", PromptType.Number, { defaultValue: 1920 });
    const height = await this.promptService.input<number>("Height", PromptType.Number, { defaultValue: 1080 });
    const outputName = await this.promptService.input("Output", PromptType.Input);

    this.commandBuilder
      .setOption("-i", pathToVideo)
      .setOption("-codec", "a", CommandOperator.Colon)
      .setOption("copy")
      .setOption("-vcodec")
      .setOption("libx264")
      .setOption("-vf")
      .setOption("scale", `${width}x${height}`, CommandOperator.Equal)
      .setOption("-preset", "slow")
      .setOption(outputName + "-commpressed.mp4");
  }

  public getDescription(): string {
    return "Compress Video";
  }
}
