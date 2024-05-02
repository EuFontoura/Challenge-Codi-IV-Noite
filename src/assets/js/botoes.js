$(document).ready(function () {
  // Evento para abrir o modal
  $(".add-receita").on("click", function () {
    $("#modalAdicionarReceita").modal("show");
  });

  $("#modalAdicionarReceita").on("hidden.bs.modal", function () {
    $("#adicionarFormReceita")[0].reset();
    $("#valorAdicionarReceita").removeClass("is-valid is-invalid");
    $("#modalAdicionarReceita").removeClass("is-valid is-invalid");
  });

  $("#nomeAdicionarReceita").on("input", function () {
    var nomeCategoria = $(this).val().trim();
    nomeCategoria = nomeCategoria.replace(/[^a-zA-ZÀ-ÿ ]/g, "");
    if (nomeCategoria !== "") {
      var nomeCapitalizado =
        nomeCategoria.charAt(0).toUpperCase() +
        nomeCategoria.slice(1).toLowerCase();
      $(this).val(nomeCapitalizado);
    }
    if (nomeCategoria === "") {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });

  $("#valorAdicionarReceita").on("blur", function () {
    // Obter o valor do campo de input
    var valorCategoria = $(this).val().trim();

    valorCategoria = valorCategoria.replace(/[^0-9,]/g, "");

    if (!valorCategoria.includes(",")) {
      if (valorCategoria === "") {
        valorCategoria = "0";
      }
      valorCategoria += "00";
      valorCategoria =
        valorCategoria.slice(0, -2) + "," + valorCategoria.slice(-2);
    } else {

      var partes = valorCategoria.split(",");
      var parteInteira = partes[0];
      var decimais = partes[1];

      if (decimais.length !== 2) {

        decimais = decimais.padEnd(2, "0").slice(0, 2);
      }

      valorCategoria = parteInteira + "," + decimais;
    }

    $(this).val(valorCategoria);

    if (
      valorCategoria === "0,00" ||
      !/^\d{1,3}(?:\.\d{3})*|\d+,\d{2}$/.test(valorCategoria)
    ) {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {

      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });
});

$(document).ready(function () {

  $(".add-despesa").on("click", function () {
    $("#modalAdicionarDespesa").modal("show");
  });

  $("#modalAdicionarDespesa").on("hidden.bs.modal", function () {
    $("#adicionarFormDespesa")[0].reset();
    $("#valorAdicionarDespesa").removeClass("is-valid is-invalid");
    $("#modalAdicionarDespesa").removeClass("is-valid is-invalid");
  });

  $("#nomeAdicionarDespesa").on("input", function () {
    var nomeCategoria = $(this).val().trim();
    nomeCategoria = nomeCategoria.replace(/[^a-zA-ZÀ-ÿ ]/g, "");
    if (nomeCategoria !== "") {
      var nomeCapitalizado =
        nomeCategoria.charAt(0).toUpperCase() +
        nomeCategoria.slice(1).toLowerCase();
      $(this).val(nomeCapitalizado);
    }
    if (nomeCategoria === "") {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });

  $("#valorAdicionarDespesa").on("blur", function () {
    var valorCategoria = $(this).val().trim();

    valorCategoria = valorCategoria.replace(/[^0-9,]/g, "");

    if (!valorCategoria.includes(",")) {
      if (valorCategoria === "") {
        valorCategoria = "0";
      }
      valorCategoria += "00";
      valorCategoria =
        valorCategoria.slice(0, -2) + "," + valorCategoria.slice(-2);
    } else {
      var partes = valorCategoria.split(",");
      var parteInteira = partes[0];
      var decimais = partes[1];
      if (decimais.length !== 2) {
        decimais = decimais.padEnd(2, "0").slice(0, 2);
      }

      valorCategoria = parteInteira + "," + decimais;
    }
    $(this).val(valorCategoria);
    if (
      valorCategoria === "0,00" ||
      !/^\d{1,3}(?:\.\d{3})*|\d+,\d{2}$/.test(valorCategoria)
    ) {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });
});


$(document).ready(function () {

  $(".add-planejamento").on("click", function () {
    $("#modalAdicionarPlanejamento").modal("show");
  });

  $("#modalAdicionarPlanejamento").on("hidden.bs.modal", function () {
    $("#adicionarFormPlanejamento")[0].reset();
    $("#valorAdicionarPlanejamento").removeClass("is-valid is-invalid");
    $("#modalAdicionarPlanejamento").removeClass("is-valid is-invalid");
  });

  $("#nomeAdicionarPlanejamento").on("input", function () {
    var nomeCategoria = $(this).val().trim();
    nomeCategoria = nomeCategoria.replace(/[^a-zA-ZÀ-ÿ ]/g, "");
    if (nomeCategoria !== "") {
      var nomeCapitalizado =
        nomeCategoria.charAt(0).toUpperCase() +
        nomeCategoria.slice(1).toLowerCase();
      $(this).val(nomeCapitalizado);
    }
    if (nomeCategoria === "") {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });

  $("#valorAdicionarPlanejamento").on("blur", function () {
    var valorCategoria = $(this).val().trim();

    valorCategoria = valorCategoria.replace(/[^0-9,]/g, "");

    if (!valorCategoria.includes(",")) {
      if (valorCategoria === "") {
        valorCategoria = "0";
      }
      valorCategoria += "00";
      valorCategoria =
        valorCategoria.slice(0, -2) + "," + valorCategoria.slice(-2);
    } else {
      var partes = valorCategoria.split(",");
      var parteInteira = partes[0];
      var decimais = partes[1];
      if (decimais.length !== 2) {
        decimais = decimais.padEnd(2, "0").slice(0, 2);
      }

      valorCategoria = parteInteira + "," + decimais;
    }
    $(this).val(valorCategoria);
    if (
      valorCategoria === "0,00" ||
      !/^\d{1,3}(?:\.\d{3})*|\d+,\d{2}$/.test(valorCategoria)
    ) {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });
});