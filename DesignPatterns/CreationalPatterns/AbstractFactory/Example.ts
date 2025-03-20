/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract UI components. These components are part of a theme family.
 */
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

/**
 * Concrete Factories produce a family of UI components that belong to a single theme.
 */
class LightThemeFactory implements UIFactory {
  public createButton(): Button {
    return new LightButton();
  }

  public createCheckbox(): Checkbox {
    return new LightCheckbox();
  }
}

class DarkThemeFactory implements UIFactory {
  public createButton(): Button {
    return new DarkButton();
  }

  public createCheckbox(): Checkbox {
    return new DarkCheckbox();
  }
}

/**
 * Each UI component must have a base interface. All variants of the component
 * must implement this interface.
 */
interface Button {
  render(): string;
}

interface Checkbox {
  render(): string;
  collaborateWithButton(button: Button): string;
}

/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class LightButton implements Button {
  public render(): string {
    return 'Render a button in Light Theme style.';
  }
}

class LightCheckbox implements Checkbox {
  public render(): string {
    return 'Render a checkbox in Light Theme style.';
  }

  public collaborateWithButton(button: Button): string {
    return `Light Checkbox collaborating with (${button.render()})`;
  }
}

class DarkButton implements Button {
  public render(): string {
    return 'Render a button in Dark Theme style.';
  }
}

class DarkCheckbox implements Checkbox {
  public render(): string {
    return 'Render a checkbox in Dark Theme style.';
  }

  public collaborateWithButton(button: Button): string {
    return `Dark Checkbox collaborating with (${button.render()})`;
  }
}

/**
 * The client code works with factories and products only through abstract types.
 */
function clientCode(factory: UIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  console.log(button.render());
  console.log(checkbox.render());
  console.log(checkbox.collaborateWithButton(button));
}

/**
 * The client code can work with any concrete factory class.
 */
console.log('Client: Testing client code with the Light Theme Factory...');
clientCode(new LightThemeFactory());

console.log('');

console.log('Client: Testing client code with the Dark Theme Factory...');
clientCode(new DarkThemeFactory());

export {};
