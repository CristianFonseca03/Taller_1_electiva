import Logic from "../logic/Logic.js";
const logic = new Logic();

$(document).ready(() => {
  $("#alert").hide();
  createFacturasTable(logic.getFacturas());
  addToSelecct(logic.getFacturas());
  changeFields(logic.getFacturas()[0].total, logic.getFacturas()[0].total);
});

$("#selectFactura").change(() => {
  const index = $("#selectFactura").val();
  changeFields(
    logic.getFacturas()[index].total,
    logic.getFacturas()[index].total
  );
});

$("#valAbono").on("keypress", logic.onlyNums);

$("#valAbono").on("keyup", () => {
  const value = $("#valAbono");
  const index = $("#selectFactura").val();
  let totalValue = logic.getFacturas()[index].total - value.val();
  $("#newSaldo").val("$" + logic.formatMoney(totalValue));
});

$("#btn1").click(() => {
  realizarAbono();
});

$("#btn2").click(() => {
  clearInputFields();
});

const realizarAbono = () => {
  const abono = $("#valAbono").val();
  const index = $("#selectFactura").val();
  $("#alert").hide();
  if (abono === null || abono === "" || abono === "0") {
    $("#mensajeInvalidoAbono").text("Ingrese un numero valido");
    $("#valAbono").addClass("is-invalid");
  } else if (logic.getFacturas()[index].total - abono < 0) {
    $("#mensajeInvalidoNewSaldo").text("No puede ser menor a 0");
    $("#newSaldo").addClass("is-invalid");
    $("#mensajeInvalidoAbono").text(
      "El valor del abono no puede superar la deuda"
    );
    $("#valAbono").addClass("is-invalid");
  } else {
    $("#newSaldo").removeClass("is-invalid");
    $("#valAbono").removeClass("is-invalid");
    logic.makePayment(index, abono);
    createFacturasTable(logic.getFacturas());
    changeFields(
      logic.getFacturas()[index].total,
      logic.getFacturas()[index].total
    );
    createAbonosTable(logic.getPayments());
    clearInputFields();
  }
};

const changeFields = (saldo, newSaldo) => {
  $("#saldo").empty();
  $("#newSaldo").empty();
  $("#saldo").val("$" + logic.formatMoney(saldo));
  $("#newSaldo").val("$" + logic.formatMoney(newSaldo));
  if (newSaldo === 0) {
    $("#valAbono").prop("disabled", true);
  } else {
    $("#valAbono").prop("disabled", false);
  }
};

const createFacturasTable = (facturas) => {
  $("#facturas tbody").empty();
  facturas.forEach((e, i) => {
    let fila = `<tr><td>${e.number}</td><td>${e.date}</td><td>${
      e.payment
    }</td><td>${e.term === 0 ? "" : e.term}</td><td>${
      "$" + logic.formatMoney(e.total)
    }</td></tr>`;
    $("#facturas tbody").append(fila);
  });
};

const createAbonosTable = (abonos) => {
  $("#abonos tbody").empty();
  abonos.forEach((e, i) => {
    let fila = `<tr><td>${e.number}</td><td>${e.payments}</td><td>${
      "$" + logic.formatMoney(e.totalPayments)
    }</td><td>${e.expirationDate}</td><td>${
      "$" + logic.formatMoney(e.balance)
    }</td></td><td><button type="button" class="btn btn-outline-info"><i class="fas fa-search"></i></button></td></tr>`;
    $("#abonos tbody").append(fila);
  });
};

const addToSelecct = (facturas) => {
  facturas.forEach((e, i) => {
    $("#selectFactura").append(new Option(e.number, i));
  });
};

const clearInputFields = () => {
  $("#valAbono").val("");
  $("#chain").val("");
};
