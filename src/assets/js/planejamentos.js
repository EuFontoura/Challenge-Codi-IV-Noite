var planejamentos = [];

function salvarPlanejamentos() {
  localStorage.setItem("planejamentos", JSON.stringify(planejamentos));
}

function recuperarPlanejamentos() {
  var planejamentosSalvos = localStorage.getItem("planejamentos");
  if (planejamentosSalvos) {
    planejamentos = JSON.parse(planejamentosSalvos);
  }
}

document.addEventListener("DOMContentLoaded", recuperarPlanejamentos);

window.addEventListener("beforeunload", salvarPlanejamentos);

// Adicionar Planejamento
$(document).ready(function () {
  var isProcessingForm = false;

  $("#planejamentoForm").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) return;
    isProcessingForm = true;

    var metaPlanejamento = $("#metaPlanejamento").val().trim();
    var nomePlanejamento = $("#nomePlanejamento").val().trim();
    var icon = $("#iconePlanejamento .btn-secondary").attr("data-icon");

    if (!nomePlanejamento) {
      $("#nomePlanejamento").addClass("is-invalid");
      isProcessingForm = false;
      return;
    }

    var novoPlanejamento = {
      id: crypto.randomUUID(),
      nome: nomePlanejamento,
      icone: icon,
      lancamentos: [],
      meta: metaPlanejamento,
      created_at: new Date(),
    };

    var planejamentosArray = planejamentos;
    var planejamentoExistente = planejamentosArray.find(
      (planejamento) => planejamento.nome === nomePlanejamento
    );

    if (planejamentoExistente) {
      exibirToast("Planejamento já existe!", "#871919");
      isProcessingForm = false;
      return;
    }

    planejamentosArray.push(novoPlanejamento);

    exibirToast("Planejamento adicionado com sucesso!", "#198754");
    $("#modalPlanejamento").modal("hide");

    isProcessingForm = false;
  });

  resetModal();

  $("#btnAddPlanejamento").on("click", function (event) {
    event.preventDefault();

    if (!isProcessingForm) $("#planejamentoForm").submit();
    preencherSubMenuPlanejamentos();
  });
});

// Reseta modal
function resetModal() {
  $("#modalPlanejamento").on("hidden.bs.modal", function () {
    $("#planejamentoForm")[0].reset();
    $("#nomePlanejamento").removeClass("is-valid is-invalid");
  });
}

// Valida modal
$(document).ready(function () {
  $("#nomePlanejamento").on("input", function () {
    var nomePlanejamento = $(this).val().trim();
    nomePlanejamento = nomePlanejamento.replace(/[^a-zA-ZÀ-ÿ ]/g, "");
    if (nomePlanejamento !== "") {
      var nomeCapitalizado =
        nomePlanejamento.charAt(0).toUpperCase() +
        nomePlanejamento.slice(1).toLowerCase();
      $(this).val(nomeCapitalizado);
    }
    if (nomePlanejamento === "") {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });

  $("#metaPlanejamento").on("blur", function () {

    var metaPlanejamento = $(this).val().trim();

    metaPlanejamento = metaPlanejamento.replace(/[^0-9,]/g, "");

    if (!metaPlanejamento.includes(",")) {
      if (metaPlanejamento === "") {
        metaPlanejamento = "0";
      }
      metaPlanejamento += "00";
      metaPlanejamento =
        metaPlanejamento.slice(0, -2) + "," + metaPlanejamento.slice(-2);
    } else {
      var partes = metaPlanejamento.split(",");
      var parteInteira = partes[0];
      var decimais = partes[1];

      if (decimais.length !== 2) {
        decimais = decimais.padEnd(2, "0").slice(0, 2);
      }

      metaPlanejamento = parteInteira + "," + decimais;
    }

    $(this).val(metaPlanejamento);

    if (
      metaPlanejamento === "0,00" ||
      !/^\d{1,3}(?:\.\d{3})*|\d+,\d{2}$/.test(metaPlanejamento)
    ) {
      $(this).removeClass("is-valid").addClass("is-invalid");
    } else {
      $(this).removeClass("is-invalid").addClass("is-valid");
    }
  });
});

$(document).ready(function () {
  preencherSubMenuPlanejamentos();
});


const atualizarTabelaPlanejamento = (planejamento) => {
  const corpoTabela = document.getElementById("corpo-tabela-planejamento");
  corpoTabela.innerHTML = "";

  planejamento.lancamentos.forEach((lancamento) => {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
            <td class="td-planejamento">${lancamento.data}</td>
            <td class="td-planejamento">R$ ${lancamento.valor}</td>
          `;
    corpoTabela.appendChild(novaLinha);
  })
};

//Muda tela Principal
function exibirPlanejamento(id) {
  const planejamento = planejamentos.find((p) => {
    return p.id === id;
  });



  $(".main").css({ display: "none" });
  $(".main-planejamento").css({ display: "flex" });

  const titulo = document.getElementById("titlePlanejamento");
  titulo.innerHTML = planejamento.nome;

  const meta = document.getElementById('meta');
  meta.innerHTML = planejamento.meta;

  acumularInvestimento(planejamento)

  atualizarTabelaPlanejamento(planejamento);
}

function acumularInvestimento(planejamento) {
  let totalAcumulado = 0;

  planejamento.lancamentos.forEach((l) => {
    totalAcumulado = totalAcumulado + l.valor;
  });

  const acc = document.getElementById('investido');
  acc.innerHTML = totalAcumulado;
}








