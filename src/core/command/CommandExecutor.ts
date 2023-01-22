import { spawn } from "node:child_process";

export class CommandExecutor {
  public run(command: string, parameters: string[] = []): void {
    const spawnedCommand = spawn(command, parameters);
    spawnedCommand.stdout.on("data", (data) => console.log(`stdout: ${data}`));
    spawnedCommand.stderr.on("data", (data) => console.log(`stderr: ${data}`));
    spawnedCommand.on("error", (error) => console.log(`error: ${error.message}`));
    spawnedCommand.on("close", (code) => console.log(`child process exited with code ${code}`));
  }
}
