class Plan {
  constructor(name, description, planId) {
    this.name = name;
    if (description) {
      this.description = description;
    }
    this.planId = planId;
  }
}

module.exports = Plan;