
# Command Executor

Command Executor is a NodeJs-based(TypeScript) helper designed to interactively run terminal tools and commands.

It goes along with extensible architecture, so it's easy to add new commands or change existing ones for any needs.
## Getting Started

```
docker run -it -v ${PWD}:/app/volume businesspunk/command-executor
```

## Project Structure

```
├── dist (Compilation output)
├── src
│   ├── commands
│   │   ├── AppCommands.ts (List of current commands)
│   │   ├── CompressVideoCommand.ts
│   │   ├── DownloadYouTubeVideoCommand.ts
│   │   ├── DownloadYouTubeAudioCommand.ts
│   │   ├── ... (Any new commands should be added here)
│   ├── core
│   │   ├── Command.ts
│   │   ├── CommandBuilder.ts
│   │   ├── ... (Other core classes closed to change)
│   ├── tests 
│   │   └── ... (Unit-tests)
│   ├── App.ts (Launching the App)
```
## Commands

- Compressing video
- Download video from Youtube
- Download audio(mp3) from Youtube


## Screenshots

![commands screenshot](https://github.com/Businesspunk/command-executor/blob/main/github/commands.jpg)

![ffmpeg screenshot](https://github.com/Businesspunk/command-executor/blob/main/github/ffmpeg.png)


## ToDo

- Optimize DockerImage size
- Add Photo compress&converter
- Add more integrations with Linux tools


## Tech Stack

**Daemon:** Typescript, Node


## License

[MIT](https://choosealicense.com/licenses/mit/)

