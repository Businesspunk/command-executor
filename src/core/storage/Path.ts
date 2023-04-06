import { injectable } from "tsyringe";
import Paths from "./paths.json";
import * as PathEssential from "path";

@injectable()
export class Path {
  public makePathToPublicUserVolume(path: string | null = null): string {
    return (
      "/" + (path ? this.mergePaths(Paths.app, Paths.userVolume, path) : this.mergePaths(Paths.app, Paths.userVolume))
    );
  }

  private mergePaths(...paths: string[]): string {
    return PathEssential.join(...paths);
  }
}
