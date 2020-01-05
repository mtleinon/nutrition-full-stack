class Plan {
  constructor(name, description) {
    this.name = name;
    if (description) {
      this.description = description;
    }
  }
}

module.exports = Plan;