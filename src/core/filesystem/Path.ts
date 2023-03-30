import S from "string";
import { injectable } from "tsyringe";
import Paths from "./paths.json";

@injectable()
export class Path {
  public makePathToPublicUserVolume(path: string | null = null): string {
    return (
      "/" + (path ? this.mergePaths(Paths.app, Paths.userVolume, path) : this.mergePaths(Paths.app, Paths.userVolume))
    );
  }

  private mergePaths(...paths: string[]): string {
    const path = paths.reduce(
      (result, currentValue: string) => result + "/" + S(currentValue).chompLeft("/").chompRight("/").s
    );
    return S(path).chompLeft("/").s;
  }
}
