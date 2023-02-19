import type * as CommandBuilderTypes from "../core/command/CommandBuilder";

const { CommandBuilder } = jest.requireActual<typeof CommandBuilderTypes>("../core/command/CommandBuilder");

describe("Command builder test suite", () => {
  let commandBuilder: CommandBuilderTypes.CommandBuilder;

  beforeEach(() => {
    commandBuilder = new CommandBuilder();
  });

  test("Set correct command name", () => {
    const commandNames = ["test command", "testCommand", "123"];
    commandNames.forEach((value: string) => {
      commandBuilder.setName(value);
      expect(commandBuilder.getName()).toBe(value);
    });
  });
});

export {};
