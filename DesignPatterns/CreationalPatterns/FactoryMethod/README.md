# Factory Method

**Factory Method** is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

Factory Method defines a method that should be used for creating objects instead of a direct constructor call (new operator). Subclasses can override this method to change the class of objects that will be created.

**Usage examples**: The Factory Method pattern is widely used in TypeScript code. It’s very useful when you need to provide a high level of flexibility for your code.

**Identification**: Factory methods can be recognized by creation methods that construct objects from concrete classes. While concrete classes are used during the object creation, the return type of the factory methods is usually declared as either an abstract class or an interface.