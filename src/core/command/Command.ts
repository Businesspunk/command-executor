import { CommandBuilder } from "./CommandBuilder";

export abstract class Command {
  private readonly name: string;
  private readonly commandBuilder: CommandBuilder;

  constructor() {
    this.commandBuilder = new CommandBuilder(this.name);
  }

  public run() {
    const parameters = this.promptParameters();
    this.runCommand(parameters);
  }

  protected abstract promptParameters(): any;
  protected abstract runCommand(parameters: any): any;
}
