const path = require("path");
const fs = require("fs");

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];
    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour,
    };
  }

  init() {
    const { today, tickets, last, lastFour } = require("../data/data.json");
    if (today === this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lastFour = lastFour;
    } else {
      this.saveData();
    }
  }

  saveData() {
    const dataPath = path.join(__dirname, "../data/data.json");
    fs.writeFileSync(dataPath, JSON.stringify(this.toJson));
  }
}

module.exports = TicketControl;
