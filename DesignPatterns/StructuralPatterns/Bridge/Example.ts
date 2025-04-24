/**
 * Example Use Case:
 * This example demonstrates the Bridge pattern, which decouples an abstraction
 * (e.g., `RemoteControl`) from its implementation (e.g., `Device`) so that the two
 * can vary independently. This allows the same abstraction to work with different
 * implementations without modifying their code.
 */

/**
 * The `Device` interface defines the implementation-specific operations
 * that concrete devices (e.g., TV, Radio) must implement.
 */
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
}

/**
 * Concrete implementation of the `Device` interface for a TV.
 */
class TV implements Device {
  private on = false;
  private volume = 30;

  isEnabled(): boolean {
    return this.on;
  }

  enable(): void {
    this.on = true;
    console.log('TV turned on');
  }

  disable(): void {
    this.on = false;
    console.log('TV turned off');
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
    console.log(`TV volume set to ${this.volume}`);
  }
}

/**
 * Concrete implementation of the `Device` interface for a Radio.
 */
class Radio implements Device {
  private on = false;
  private volume = 50;

  isEnabled(): boolean {
    return this.on;
  }

  enable(): void {
    this.on = true;
    console.log('Radio turned on');
  }

  disable(): void {
    this.on = false;
    console.log('Radio turned off');
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
    console.log(`Radio volume set to ${this.volume}`);
  }
}

/**
 * The `RemoteControl` class acts as the abstraction in the Bridge pattern.
 * It defines high-level operations that work with any `Device` implementation.
 */
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  /**
   * Toggles the power state of the device.
   */
  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  /**
   * Decreases the device's volume by 10%.
   */
  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  /**
   * Increases the device's volume by 10%.
   */
  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }
}

/**
 * The `AdvancedRemoteControl` class extends the functionality of `RemoteControl`
 * by adding additional operations, such as muting the device.
 */
class AdvancedRemoteControl extends RemoteControl {
  /**
   * Mutes the device by setting its volume to 0.
   */
  mute(): void {
    this.device.setVolume(0);
    console.log('Muted the device');
  }
}

// Example usage of the Bridge pattern:

/**
 * Create a TV device and control it using a basic remote control.
 */
const tv = new TV();
const remote = new RemoteControl(tv);
remote.togglePower(); // Turn on
remote.volumeUp();

console.log('');

/**
 * Create a Radio device and control it using an advanced remote control.
 */
const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.togglePower(); // Turn on
advancedRemote.mute();

export {};