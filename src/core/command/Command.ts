import { CommandBuilder } from "./CommandBuilder";
import { CommandExecutor } from "./CommandExecutor";

export abstract class Command {
  protected readonly commandBuilder: CommandBuilder;
  protected readonly executor: CommandExecutor;

  constructor(private readonly name: string) {
    this.commandBuilder = new CommandBuilder(name);
    this.executor = new CommandExecutor();
  }

  public async run(): Promise<void> {
    await this.promptParameters();
    this.executor.run(this.name, this.commandBuilder.build().params);
  }

  protected abstract promptParameters(): void;
}
