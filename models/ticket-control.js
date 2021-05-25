const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(number) {
    this.number = number;
    this.desktop = desktop;
  }
}

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

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveData();
    return this.number;
  }
  attendTicket(desktop) {
    if (this.tickets.length === 0) {
      return null;
    }
    const ticket = this.tickets.shift();
    ticket.desktop = desktop;
    this.lastFour.unshift(ticket);
    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1);
    }
    this.saveData();
    return ticket;
  }
}

module.exports = TicketControl;
