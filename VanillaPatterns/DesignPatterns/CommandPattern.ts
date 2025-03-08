/**
 * This TypeScript example demonstrates how the Command Design Pattern solves problems related to:
 * - Decoupling senders and receivers.
 * - Supporting undo/redo functionality.
 * - Logging and auditing commands.
 * - Simplifying the addition of new commands.
 * - Managing complex operations and transactions.
 * By encapsulating requests as objects, the Command Pattern makes the system more flexible, maintainable, and extensible.
 */

// Command Interface: Defines the contract for all commands
interface Command {
  execute(): void; // Method to execute the command
  undo(): void;   // Method to undo the command
}

// Receiver: Represents a device (e.g., Light)
class Light {
  on(): void {
    console.log("Light is ON");
  }

  off(): void {
    console.log("Light is OFF");
  }
}

// Receiver: Represents another device (e.g., TV)
class TV {
  on(): void {
    console.log("TV is ON");
  }

  off(): void {
    console.log("TV is OFF");
  }
}

// Concrete Command: Turns the light ON
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.on(); // Delegates the action to the receiver
  }

  undo(): void {
    this.light.off(); // Reverses the action
  }
}

// Concrete Command: Turns the light OFF
class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.off(); // Delegates the action to the receiver
  }

  undo(): void {
    this.light.on(); // Reverses the action
  }
}

// Concrete Command: Turns the TV ON
class TVOnCommand implements Command {
  private tv: TV;

  constructor(tv: TV) {
    this.tv = tv;
  }

  execute(): void {
    this.tv.on(); // Delegates the action to the receiver
  }

  undo(): void {
    this.tv.off(); // Reverses the action
  }
}

// Concrete Command: Turns the TV OFF
class TVOffCommand implements Command {
  private tv: TV;

  constructor(tv: TV) {
    this.tv = tv;
  }

  execute(): void {
    this.tv.off(); // Delegates the action to the receiver
  }

  undo(): void {
    this.tv.on(); // Reverses the action
  }
}

// Macro Command: A composite command that groups multiple commands
class MacroCommand implements Command {
  private commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  execute(): void {
    // Executes all commands in sequence
    this.commands.forEach((command) => command.execute());
  }

  undo(): void {
    // Undoes all commands in reverse order
    this.commands.reverse().forEach((command) => command.undo());
  }
}

// Invoker: The remote control that triggers commands
class RemoteControl {
  private commands: Command[] = []; // Stores available commands
  private undoCommand: Command | null = null; // Stores the last executed command for undo

  // Assigns a command to a slot
  setCommand(command: Command): void {
    this.commands.push(command);
  }

  // Executes a command by its index
  pressButton(index: number): void {
    if (index < this.commands.length) {
      this.commands[index].execute(); // Executes the command
      this.undoCommand = this.commands[index]; // Stores the command for undo
    } else {
      console.log("Command not found");
    }
  }

  // Undoes the last executed command
  pressUndo(): void {
    if (this.undoCommand) {
      this.undoCommand.undo(); // Undoes the command
      this.undoCommand = null; // Resets the undo command
    } else {
      console.log("No command to undo");
    }
  }
}

// Client Code: Demonstrates the usage of the Command Pattern
const light = new Light(); // Creates a Light receiver
const tv = new TV(); // Creates a TV receiver

// Creates concrete commands
const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);
const tvOn = new TVOnCommand(tv);
const tvOff = new TVOffCommand(tv);

// Creates macro commands
const partyModeOn = new MacroCommand([lightOn, tvOn]); // Turns everything ON
const partyModeOff = new MacroCommand([lightOff, tvOff]); // Turns everything OFF

const remote = new RemoteControl(); // Creates the invoker (remote control)

// Assigns commands to the remote control
remote.setCommand(lightOn);
remote.setCommand(tvOn);
remote.setCommand(lightOff);
remote.setCommand(tvOff);
remote.setCommand(partyModeOn);
remote.setCommand(partyModeOff);

// Executes commands
remote.pressButton(0); // Turns the light ON
remote.pressButton(1); // Turns the TV ON
remote.pressButton(2); // Turns the light OFF
remote.pressButton(3); // Turns the TV OFF
remote.pressButton(4); // Turns everything ON
remote.pressButton(5); // Turns everything OFF
remote.pressUndo();    // Undoes the last command (turns everything OFF)

/**
 * How This Code Solves the Problems:
 * - Decouples Sender and Receiver:
 *   The RemoteControl (sender) doesn't know how the commands are executed. It only calls the execute() method on the Command object.
 * - Supports Undo/Redo:
 *   Each command implements an undo() method, allowing the system to reverse actions. The RemoteControl stores the last executed command for undo.
 * - Queuing and Scheduling:
 *   Commands can be stored in an array and executed in a specific order (e.g., using MacroCommand).
 * - Logging and Auditing:
 *   Since each command is an object, it's easy to log all executed commands for auditing purposes.
 * - Easy to Add New Commands:
 *   To add a new command, simply create a new class that implements the Command interface without modifying existing code.
 * - Handles Complex Operations:
 *   The MacroCommand groups multiple commands into a single operation, simplifying complex workflows.
 * - Supports Transactions:
 *   The MacroCommand can execute multiple commands as a single transaction. If one command fails, the entire transaction can be undone.
 */