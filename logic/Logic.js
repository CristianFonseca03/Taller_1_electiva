import Factura from "../model/Factura.js";

class Logic {
  constructor() {
    this.facturas = [
      new Factura(345345, "2017-07-21", "Crédito", 30, 234454),
      new Factura(872034, "2020-06-25", "Contado", 0, 7435246),
      new Factura(293658, "2018-06-25", "Contado", 90, 932937),
    ];
    this.payments = [];
  }
  getFacturas() {
    return this.facturas;
  }
  setFacturas(facturas) {
    this.facturas = facturas;
  }
  getPayments() {
    return this.payments;
  }
  setPayments(payments) {
    this.payments = payments;
  }
  makePayment(i, payment) {
    const factura = this.facturas[i];
    let found = false;
    let index = undefined;
    this.payments.forEach((e, i) => {
      if (e.number === factura.number) {
        found = true;
        index = i;
      }
    });
    if (found) {
      let paymentElement = this.payments[index];
      paymentElement.payments = paymentElement.payments + 1;
      paymentElement.totalPayments =
        paymentElement.totalPayments + Number(payment);
      paymentElement.balance = factura.total - Number(payment);
      let payments = this.payments;
      payments[i] = paymentElement;
      this.setPayments(payments);
    } else {
      this.payments.push({
        number: factura.number,
        payments: 1,
        totalPayments: Number(payment),
        expirationDate: moment(factura.date, "YYYY-MM-DD")
          .add("days", factura.term)
          .format("YYYY-MM-DD"),
        balance: factura.total - Number(payment),
      });
    }
    let facturas = this.facturas;
    facturas[i].total = factura.total - Number(payment);
    this.setFacturas(facturas);
  }
  formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  }
  onlyNums(event) {
    const code = window.event ? event.which : event.keyCode;
    if (code < 48 || code > 57) event.preventDefault();
  }
}

export default Logic;
