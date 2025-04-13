
/**
 * The configuration manager loads settings once and provides global access 
 * to them throughout the application.
 */
class ConfigurationManager {
  private static instance: ConfigurationManager;
  private settings: Record<string, string | number>;

  private constructor() {
    // Private constructor prevents direct construction
    this.settings = this.loadConfigurations();
  }

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  private loadConfigurations(): Record<string, string | number> {
    // Simulate loading from a file/database
    return {
      theme: "dark",
      apiUrl: "https://api.example.com",
      timeout: 5000
    };
  }

  // Business logic methods
  public getSetting(key: string): string | number {
    return this.settings[key];
  }
}

/**
 * Client code
 */
function client() {
  const config1 = ConfigurationManager.getInstance();
  const config2 = ConfigurationManager.getInstance();

  console.log(config1 === config2); // true
  console.log(config1.getSetting("apiUrl")); // Same value from both
  console.log(config2.getSetting("theme")); // Same value from both
}

client();

export {};