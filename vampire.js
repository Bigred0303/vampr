class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  get numberOfOffspring() {
    return this.offspring.length;
  }

  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      count++;
      currentVampire = currentVampire.creator;
    }
    return count;
  }

  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

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

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (let child of this.offspring) {
      let result = child.vampireWithName(name);
      if (result) {
        return result;
      }
    }
    return null;
  }

  get totalDescendents() {
    let count = 0;
    function countDescendents(vampire) {
      for (let child of vampire.offspring) {
        count++;
        countDescendents(child);
      }
    }
    countDescendents(this);
    return count;
  }

  get allMillennialVampires() {
    let millennials = [];
    function findMillennials(vampire) {
      if (vampire.yearConverted > 1980) {
        millennials.push(vampire);
      }
      for (let child of vampire.offspring) {
        findMillennials(child);
      }
    }
    findMillennials(this);
    return millennials;
  }
}

module.exports = Vampire;