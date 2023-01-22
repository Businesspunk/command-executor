import "reflect-metadata";
import { container } from "tsyringe";
import {injectable} from "tsyringe";
import { CommpressVideoCommand } from "./commands/CompressVideoCommand";

@injectable()
class App {
  public constructor(private readonly commpressVideoCommand: CommpressVideoCommand) {}

  public run(): void {
    this.commpressVideoCommand.run();
  }
}

container.resolve(App).run();
