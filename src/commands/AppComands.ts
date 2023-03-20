import { injectable } from "tsyringe";
import { Command } from "../core/command/Command";
import { CommpressVideoCommand } from "./CompressVideoCommand";
import { DownloadYouTubeVideoCommand } from "./DownloadYouTubeVideoCommand";
import { DownloadYouTubeAudioCommand } from "./DownloadYouTubeAudioCommand";

@injectable()
export class AppCommands {
  private commands: Command[] = [];

  public constructor(
    commpressVideoCommand: CommpressVideoCommand,
    youtubeVideoDownloader: DownloadYouTubeVideoCommand,
    youtubeAudioDownloader: DownloadYouTubeAudioCommand
  ) {
    this.commands.push(commpressVideoCommand, youtubeVideoDownloader, youtubeAudioDownloader);
  }

  public getCommands(): Command[] {
    return this.commands;
  }
}
