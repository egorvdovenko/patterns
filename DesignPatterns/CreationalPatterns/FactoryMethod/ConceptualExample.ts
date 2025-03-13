/**
 * Factory Method Design Pattern
 * 
 * This example demonstrates the Factory Method design pattern, which defines an interface for creating an object,
 * but allows subclasses to alter the type of objects that will be created.
 * 
 * The pattern involves the following components:
 * 
 * - Creator: Declares the factory method that returns an object of type Product. May also provide some default implementation.
 * - ConcreteCreator: Overrides the factory method to return an instance of a ConcreteProduct.
 * - Product: Declares the interface for the objects the factory method creates.
 * - ConcreteProduct: Implements the Product interface.
 * 
 * The Factory Method pattern allows the client code to be independent of the concrete classes it needs to instantiate,
 * and it can work with any classes derived from the Creator class.
 */

/**
 * The Creator class declares the factory method that is supposed to return an object of a Product class. 
 * The Creator's subclasses usually provide the implementation of this method.
 */
abstract class Creator {
  /**
   * Note that the Creator may also provide some default implementation of the factory method.
   */
  public abstract factoryMethod(): Product;

  /**
   * Also note that, despite its name, the Creator's primary responsibility is not creating products. 
   * Usually, it contains some core business logic that relies on Product objects, returned by the factory method. 
   * Subclasses can indirectly change that business logic by overriding the factory method and returning a different type of product from it.
   */
  public someOperation(): string {
    // Call the factory method to create a Product object.
    const product = this.factoryMethod();
    // Now, use the product.
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

/**
 * Concrete Creators override the factory method in order to change the resulting product's type.
 */
class ConcreteCreator1 extends Creator {
  /**
   * Note that the signature of the method still uses the abstract product type, even though the concrete product is actually returned from the method. 
   * This way the Creator can stay independent of concrete product classes.
   */
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

/**
 * The Product interface declares the operations that all concrete products must implement.
 */
interface Product {
  operation(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}

/**
 * The client code works with an instance of a concrete creator, albeit through its base interface. 
 * As long as the client keeps working with the creator via the base interface, you can pass it any creator's subclass.
 */
function clientCode(creator: Creator) {
  // ...
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
  console.log(creator.someOperation());
  // ...
}

/**
 * The Application picks a creator's type depending on the configuration or environment.
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());