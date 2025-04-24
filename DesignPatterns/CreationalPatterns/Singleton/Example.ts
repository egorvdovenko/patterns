/**
 * Example Use Case:
 * This example implements a configuration manager for an application using the Singleton pattern.
 * The `ConfigurationManager` ensures that only one instance manages the application's settings,
 * such as theme, API URL, and timeout. This guarantees consistent access to configuration data
 * across the application while preventing multiple instances from being created.
 */

/**
 * The ConfigurationManager class implements the Singleton pattern to ensure
 * a single instance manages application configurations.
 */
class ConfigurationManager {
  private static instance: ConfigurationManager;
  private settings: Record<string, string | number>;

  /**
   * Private constructor prevents direct instantiation.
   */
  private constructor() {
    this.settings = this.loadConfigurations();
  }

  /**
   * Returns the single instance of ConfigurationManager, creating it if necessary.
   */
  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  /**
   * Simulates loading configuration settings from an external source.
   */
  private loadConfigurations(): Record<string, string | number> {
    return {
      theme: "dark",
      apiUrl: "https://api.example.com",
      timeout: 5000
    };
  }

  /**
   * Retrieves a configuration setting by key.
   */
  public getSetting(key: string): string | number {
    return this.settings[key];
  }
}

/**
 * Client code demonstrating the Singleton pattern.
 */
function client() {
  const config1 = ConfigurationManager.getInstance();
  const config2 = ConfigurationManager.getInstance();

  // Both variables reference the same instance
  console.log(config1 === config2); // true

  // Accessing configuration settings
  console.log(config1.getSetting("apiUrl")); // Same value from both
  console.log(config2.getSetting("theme")); // Same value from both
}

client();

export {};