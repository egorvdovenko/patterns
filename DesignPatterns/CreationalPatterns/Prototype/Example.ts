/**
 * Example Use Case:
 * This example demonstrates a game scenario where characters are created using a prototype.
 * The `Character` class serves as a prototype for creating new characters by cloning existing ones.
 * This approach is used to efficiently create characters with similar properties (e.g., inventory, skills)
 * while allowing customization. The example also shows how cloned characters can belong to a team,
 * ensuring proper integration into the team structure.
 */

/**
 * The Character class represents a game character and implements the Prototype pattern.
 */
class Character {
  public name: string;
  public health: number;
  public attackPower: number;
  public speed: number;
  public inventory: string[];
  public skills: Record<string, number>;
  public team?: Team;

  constructor(name: string, health: number, attackPower: number, speed: number) {
    this.name = name;
    this.health = health;
    this.attackPower = attackPower;
    this.speed = speed;
    this.inventory = [];
    this.skills = {};
  }

  /**
   * The `clone` method is the core of the Prototype pattern. It creates a shallow copy of the
   * current object and ensures that mutable properties like `inventory` and `skills` are
   * deeply copied to avoid shared references.
   */
  public clone(): this {
    const clone = Object.create(this);
    clone.inventory = [...this.inventory];
    clone.skills = { ...this.skills };

    /**
     * If the character belongs to a team, the team reference is updated to include the cloned
     * character, ensuring the cloned object is properly integrated into the team structure.
     */
    if (this.team) {
      clone.team = {
        ...this.team,
        members: this.team.members.map(member => 
          member === this ? clone : member
        ),
      };
    }

    return clone;
  }
}

class Team {
  public name: string;
  public members: Character[];

  constructor(name: string) {
    this.name = name;
    this.members = [];
  }

  /**
   * Adds a character to the team and establishes a bidirectional relationship by setting 
   * the character's `team` property.
   */
  public addMember(member: Character): void {
    this.members.push(member);
    member.team = this;
  }
}

/**
 * These are prototype objects that serve as templates for creating new characters.
 * They define default properties and behaviors for specific character types.
 */
const WarriorTemplate = new Character("Warrior", 100, 20, 10);
WarriorTemplate.skills = { slash: 15, block: 10 };
WarriorTemplate.inventory = ["Sword", "Shield"];

const MageTemplate = new Character("Mage", 60, 30, 8);
MageTemplate.skills = { fireball: 25, teleport: 5 };
MageTemplate.inventory = ["Staff", "Robe"];

// Cloning the WarriorTemplate to create a new character and customizing its properties.
const hero1 = WarriorTemplate.clone();
hero1.name = "Aragorn";
hero1.health = 120;
hero1.inventory.push("Healing Potion");

// Cloning the MageTemplate to create another character and modifying its skills.
const hero2 = MageTemplate.clone();
hero2.name = "Gandalf";
hero2.skills.fireball = 30;

// Creating a team and adding the cloned characters to it.
const team = new Team("Fantasy Heroes");
team.addMember(hero1);
team.addMember(hero2);

// Cloning the team and ensuring that each member is cloned as well.
const clonedTeam = {
  ...team,
  members: team.members.map(member => member.clone()),
};

// Checking if the cloned team is independent of the original team.
console.log(hero1.team === clonedTeam); // false
console.log(clonedTeam.members[0].team === clonedTeam); // true

// Demonstrating that changes to the prototype or cloned objects do not affect each other.
hero1.skills.slash = 999;
WarriorTemplate.inventory.push("New Item");

console.log(WarriorTemplate.skills.slash); // 15
console.log(hero1.inventory.includes("New Item")); // false

export {};
