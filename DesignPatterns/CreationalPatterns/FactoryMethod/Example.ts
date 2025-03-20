/**
 * The Product interface declares the operations that all concrete transportation methods must implement.
 */
interface Transportation {
  deliver(): string;
}

/**
 * Concrete Products provide various implementations of the Transportation interface.
 */
class Truck implements Transportation {
  public deliver(): string {
    return '{Delivered by Truck}';
  }
}

class Ship implements Transportation {
  public deliver(): string {
    return '{Delivered by Ship}';
  }
}

/**
 * The Creator class declares the factory method that is supposed to return an object of a Transportation class.
 */
abstract class Logistics {
  public abstract createTransportation(): Transportation;

  /**
   * The Creator's primary responsibility is not creating transportation objects.
   * It contains some core business logic that relies on Transportation objects.
   */
  public planDelivery(): string {
    const transportation = this.createTransportation();
    return `Logistics: Planning delivery with ${transportation.deliver()}`;
  }
}

/**
 * Concrete Creators override the factory method to change the resulting transportation type.
 */
class RoadLogistics extends Logistics {
  public createTransportation(): Transportation {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  public createTransportation(): Transportation {
    return new Ship();
  }
}

/**
 * The client code works with an instance of a concrete creator, albeit through its base interface.
 */
function clientCode(logistics: Logistics) {
  console.log('Client: I\'m not aware of the logistics class, but it still works.');
  console.log(logistics.planDelivery());
}

/**
 * The Application picks a logistics type depending on the configuration or environment.
 */
console.log('App: Launched with RoadLogistics.');
clientCode(new RoadLogistics());
console.log('');

console.log('App: Launched with SeaLogistics.');
clientCode(new SeaLogistics());

export {};
