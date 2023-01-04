import { spawn } from "node:child_process";

export class CommandExecutor {
  public run(command: string, parameters: string[] = []): void {
    const spawnedCommand = spawn(command, parameters);
    spawnedCommand.stdout.on("data", (output: unknown) => {
      console.log(output?.toString());
    });
  }
}
