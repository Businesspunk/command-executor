import { CommandOperator } from "../CommandOperator";

export interface CommandValueItemInterface {
  operator: CommandOperator | null;
  value: string | null;
}
