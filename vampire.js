class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      count++;
      currentVampire = currentVampire.creator;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  // Returns the closest common ancestor of two vampires
  closestCommonAncestor(vampire) {
    let thisAncestors = [this];
    let currentVampire = this;
    while (currentVampire.creator) {
      thisAncestors.push(currentVampire.creator);
      currentVampire = currentVampire.creator;
    }

    currentVampire = vampire;
    while (!thisAncestors.includes(currentVampire)) {
      currentVampire = currentVampire.creator;
    }

    return currentVampire;
  }
}

module.exports = Vampire;