import { CommpressVideoCommand } from "./commands/CompressVideoCommand";

class App {
  public run(): void {
    new CommpressVideoCommand().run();
  }
}

new App().run();
