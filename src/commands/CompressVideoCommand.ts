import { Command } from "../core/command/Command";
import { CommandOperator } from "../core/command/CommandOperator";
import { PromptService } from "../core/prompt/PromptService";
import { PromptType } from "../core/prompt/PromptTypes";

export class CommpressVideoCommand extends Command {
  public static commandName: string = "ffmpeg";

  public constructor() {
    super(CommpressVideoCommand.commandName);
  }

  protected async promptParameters(): Promise<void> {
    const pathToVideo = await new PromptService().input<string>("Path to video", PromptType.Input);

    const width = await new PromptService().input<number>("Width", PromptType.Number, 1920);
    const height = await new PromptService().input<number>("Height", PromptType.Number, 1080);
    const outputName = await new PromptService().input<string>("Output", PromptType.Input);

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
}
