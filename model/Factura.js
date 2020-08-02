class Factura {
  constructor(number, date, payment, term, total) {
    this.number = number;
    this.date = date;
    this.payment = payment;
    this.term = term;
    this.total = total;
  }
  getNumber() {
    return this.number;
  }
  setNumber(number) {
    this.number = number;
  }
  getDate() {
    return this.date;
  }
  setDate(date) {
    this.date = date;
  }
  getPayment() {
    return this.payment;
  }
  setPayment(payment) {
    this.payment = payment;
  }
  getTerm() {
    return this.term;
  }
  setTerm(term) {
    this.term = term;
  }
  getTotal() {
    return this.total;
  }
  setTotal(total) {
    this.total = total;
  }
}

export default Factura;
