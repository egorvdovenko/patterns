/**
 * Command Interface: Declares the execute() method that all commands must implement.
 */
interface Command {
  execute(): void;
}

/**
 * Receiver: Light
 * Contains the actual logic for turning the light on and off.
 */
class Light {
  public turnOn(): void {
    console.log('Light is ON');
  }

  public turnOff(): void {
    console.log('Light is OFF');
  }
}

/**
 * Receiver: Fan
 * Contains the actual logic for turning the fan on, off, and setting its speed.
 */
class Fan {
  public turnOn(): void {
    console.log('Fan is ON');
  }

  public turnOff(): void {
    console.log('Fan is OFF');
  }

  public setSpeed(speed: number): void {
    console.log(`Fan speed set to ${speed}`);
  }
}

/**
 * Receiver: MusicPlayer
 * Contains the actual logic for playing, stopping, and setting the volume of the music player.
 */
class MusicPlayer {
  public play(): void {
    console.log('MusicPlayer is playing');
  }

  public stop(): void {
    console.log('MusicPlayer is stopped');
  }

  public setVolume(volume: number): void {
    console.log(`MusicPlayer volume set to ${volume}`);
  }
}

/**
 * Concrete Command: TurnOnLight
 * Encapsulates the action of turning on the light.
 */
class TurnOnLight implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOn();
  }
}

/**
 * Concrete Command: TurnOffLight
 * Encapsulates the action of turning off the light.
 */
class TurnOffLight implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOff();
  }
}

/**
 * Concrete Command: TurnOnFan
 * Encapsulates the action of turning on the fan.
 */
class TurnOnFan implements Command {
  private fan: Fan;

  constructor(fan: Fan) {
    this.fan = fan;
  }

  public execute(): void {
    this.fan.turnOn();
  }
}

/**
 * Concrete Command: SetFanSpeed
 * Encapsulates the action of setting the fan speed.
 */
class SetFanSpeed implements Command {
  private fan: Fan;
  private speed: number;

  constructor(fan: Fan, speed: number) {
    this.fan = fan;
    this.speed = speed;
  }

  public execute(): void {
    this.fan.setSpeed(this.speed);
  }
}

/**
 * Concrete Command: PlayMusic
 * Encapsulates the action of playing music.
 */
class PlayMusic implements Command {
  private musicPlayer: MusicPlayer;

  constructor(musicPlayer: MusicPlayer) {
    this.musicPlayer = musicPlayer;
  }

  public execute(): void {
    this.musicPlayer.play();
  }
}

/**
 * Concrete Command: SetVolume
 * Encapsulates the action of setting the music player volume.
 */
class SetVolume implements Command {
  private musicPlayer: MusicPlayer;
  private volume: number;

  constructor(musicPlayer: MusicPlayer, volume: number) {
    this.musicPlayer = musicPlayer;
    this.volume = volume;
  }

  public execute(): void {
    this.musicPlayer.setVolume(this.volume);
  }
}

/**
 * Invoker: RemoteControl
 * Holds a list of commands and executes them when requested.
 */
class RemoteControl {
  private commands: Command[] = [];

  /**
   * Adds a command to the list of commands.
   */
  public addCommand(command: Command): void {
    this.commands.push(command);
  }

  /**
   * Executes all commands in the list and clears the list afterward.
   */
  public executeCommands(): void {
    console.log('RemoteControl: Executing commands...');
    for (const command of this.commands) {
      command.execute();
    }
    this.commands = []; // Clear commands after execution
  }
}

/**
 * Client Code: Sets up the devices, creates commands, and configures the remote control.
 */
function clientCode() {
  // Create devices (Receivers)
  const light = new Light();
  const fan = new Fan();
  const musicPlayer = new MusicPlayer();

  // Create commands
  const turnOnLight = new TurnOnLight(light);
  const turnOffLight = new TurnOffLight(light);
  const turnOnFan = new TurnOnFan(fan);
  const setFanSpeed = new SetFanSpeed(fan, 3);
  const playMusic = new PlayMusic(musicPlayer);
  const setVolume = new SetVolume(musicPlayer, 10);

  // Create invoker (Remote Control)
  const remoteControl = new RemoteControl();

  // Add commands to the remote control
  remoteControl.addCommand(turnOnLight);
  remoteControl.addCommand(turnOffLight);
  remoteControl.addCommand(turnOnFan);
  remoteControl.addCommand(setFanSpeed);
  remoteControl.addCommand(playMusic);
  remoteControl.addCommand(setVolume);

  // Execute all commands
  remoteControl.executeCommands();
}

// Run the client code
clientCode();

export {};