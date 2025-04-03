/**
 * The computer builder interface defines the methods for creating parts of a
 * computer. Each concrete builder will implement these methods to create
 * specific types of computers.
 */
interface ComputerBuilder {
  addCPU(): void;
  addRAM(): void;
  addGPU(): void;
  addStorage(): void;
}

/**
 * The concrete builders implement the ComputerBuilder interface and provide
 * specific implementations for building different types of computers.
 */
class OfficeComputerBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  public addCPU(): void {
    this.computer.cpu = 'Intel Core i5';
  }

  public addRAM(): void {
    this.computer.ram = '16GB';
  }

  public addGPU(): void {
    this.computer.gpu = 'Integrated Graphics';
  }

  public addStorage(): void {
    this.computer.storage = '512GB SSD';
  }

  public getComputer(): Computer {
    return this.computer;
  }
}

class GamingComputerBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  public addCPU(): void {
    this.computer.cpu = 'AMD Ryzen 7';
  }

  public addRAM(): void {
    this.computer.ram = '32GB';
  }

  public addGPU(): void {
    this.computer.gpu = 'NVIDIA RTX 3080';
  }

  public addStorage(): void {
    this.computer.storage = '1TB SSD + 2TB HDD';
  }

  public getComputer(): Computer {
    return this.computer;
  }
}

/**
 * The product class represents the complex object under construction.
 * It contains various parts that can be assembled together.
 * The builder will create and assemble these parts.
 */
class Computer {
  public cpu: string = '';
  public ram: string = '';
  public gpu: string = '';
  public storage: string = '';

  public specs(): string {
    return `CPU: ${this.cpu}, RAM: ${this.ram}, GPU: ${this.gpu}, Storage: ${this.storage}`;
  }
}

/**
 * The director class is responsible for managing the construction process.
 * It uses a builder to create a computer step by step.
 */
class ComputerDirector {
  private builder: ComputerBuilder;

  constructor() {
    this.builder = {} as ComputerBuilder;
  }

  public setBuilder(builder: ComputerBuilder): void {
    this.builder = builder;
  }

  public buildStandardComputer(): void {
    this.builder.addCPU();
    this.builder.addRAM();
    this.builder.addStorage();
  }

  public buildEnchancedComputer(): void {
    this.builder.addCPU();
    this.builder.addRAM();
    this.builder.addGPU();
    this.builder.addStorage();
  }
}

/**
 * The client code creates a director and a builder, sets the builder in the
 * director, and then calls the build methods to create different types of computers.
 */
function clientCode(director: ComputerDirector) {
  const officeBuilder = new OfficeComputerBuilder();

  director.setBuilder(officeBuilder);
  director.buildStandardComputer();
  console.log('Standart Office Computer:', officeBuilder.getComputer().specs());
  director.buildEnchancedComputer();
  console.log('Enhanced Office Computer:', officeBuilder.getComputer().specs());

  const gamingBuilder = new GamingComputerBuilder();

  gamingBuilder.addCPU();
  gamingBuilder.addRAM();
  gamingBuilder.addGPU();
  gamingBuilder.addStorage();  
  console.log('Gaming Computer:', gamingBuilder.getComputer().specs());
}

const director = new ComputerDirector();
clientCode(director);

export {};
