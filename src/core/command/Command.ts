import { CommandBuilder } from "./CommandBuilder";
import { CommandExecutor } from "./CommandExecutor";

export abstract class Command {
  protected abstract readonly name: string;
  protected abstract readonly commandBuilder: CommandBuilder;
  protected abstract readonly executor: CommandExecutor;

  public async run(): Promise<void> {
    await this.promptParameters();
    this.executor.run(this.name, this.commandBuilder.build().params);
  }

  protected abstract promptParameters(): void;

  public getName(): string {
    return this.name
  }

  public abstract getDescription(): string
}
