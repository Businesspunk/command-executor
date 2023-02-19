import type * as CommandBuilderTypes from "../core/command/CommandBuilder";
import { CommandOperator } from "../core/command/CommandOperator";

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

  test("Build correct param object without operators", () => {
    const commandName = "testCommand";
    const simpleOption = "-i";
    const simpleValue = "path/test/item";
    commandBuilder.setName(commandName);
    commandBuilder.setOption(simpleOption, simpleValue);

    let buildResult = commandBuilder.build();
    expect(buildResult.name).toBe(commandName);
    expect(buildResult.params).toEqual([simpleOption, simpleValue]);

    const optionWithNoOperator = "--flagWithNoOperator";
    commandBuilder.setOption(optionWithNoOperator);
    buildResult = commandBuilder.build();
    expect(buildResult.name).toBe(commandName);
    expect(buildResult.params).toEqual([simpleOption, simpleValue, optionWithNoOperator]);
  });

  test("Build correct param object with equal operator", () => {
    const optionWithEqualOperator = "-equalOption";
    const valueWithEqualOperator = "equalValue";
    commandBuilder.setOption(optionWithEqualOperator, valueWithEqualOperator, CommandOperator.Equal);
    expect(commandBuilder.build().params).toEqual([
      optionWithEqualOperator + CommandOperator.Equal + valueWithEqualOperator,
    ]);
  });

  test("Build correct param object with colon operator", () => {
    const optionWithEqualOperator = "colonOption";
    const valueWithEqualOperator = "colonValue";
    commandBuilder.setOption(optionWithEqualOperator, valueWithEqualOperator, CommandOperator.Colon);
    expect(commandBuilder.build().params).toEqual([
      optionWithEqualOperator + CommandOperator.Colon + valueWithEqualOperator,
    ]);
  });
});

export {};
