import { injectable } from "tsyringe";
import { Storage } from "./Storage";
import * as FileSystem from "fs";

@injectable()
export class FileStorage implements Storage {
  getListOfFiles(path: string): string[] {
    const files: string[] = [];
    FileSystem.readdirSync(path).forEach((file: string) => files.push(file));
    return files;
  }
}
