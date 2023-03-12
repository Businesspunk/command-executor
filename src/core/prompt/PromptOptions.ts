import { PromptChoice } from "./PromptChoice";

export interface PromptOptions {
  defaultValue?: number | string;
  choices?: Array<string | number> | PromptChoice[];
}
