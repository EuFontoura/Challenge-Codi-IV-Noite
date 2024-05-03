var planejamentos = [
  {
    id: crypto.randomUUID(),
    nome: "Comprar Carro",
    icone: "fa-solid fa-car-side",
    lancamentos: [],
    meta: 0,
    created_at: new Date(),
  },
  {
    id: crypto.randomUUID(),
    nome: "Poupança",
    icone: "fas fa-piggy-bank",
    lancamentos: [],
    meta: 0,
    created_at: new Date(),
  },
];

function gerarOpcoesSelectAddPlanejamentoModal() {
  var selectCategoria = document.getElementById(
    "categoriaAdicionarPlanejamento"
  );
  selectCategoria.innerHTML = "";

  planejamentos.forEach(function (categoria) {
    var option = document.createElement("option");
    option.value = categoria.nome;
    option.text = categoria.nome;
    selectCategoria.appendChild(option);
  });
}
gerarOpcoesSelectAddPlanejamentoModal();

// Adicionar Categoria Planejamento
$(document).ready(function () {
  var isProcessingForm = false;

  $("#planejamentoForm").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) return;
    isProcessingForm = true;

    var metaCategoria = $("#metaPlanejamento").val().trim();
    var nomeCategoria = $("#nomePlanejamento").val().trim();
    var icon = $("#iconePlanejamento .btn-secondary").attr("data-icon");

    if (!nomeCategoria) {
      $("#nomePlanejamento").addClass("is-invalid");
      isProcessingForm = false;
      return;
    }

    var novaCategoria = {
      id: crypto.randomUUID(),
      nome: nomeCategoria,
      icone: icon,
      lancamentos: [],
      meta: metaCategoria,
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

    planejamentosArray.push(novaCategoria);

    exibirToast("Planejamento adicionado com sucesso!", "#198754");
    $("#modalPlanejamento").modal("hide");

    isProcessingForm = false;
  });

  resetModal();

  $("#btnAddPlanejamento").on("click", function (event) {
    event.preventDefault();

    if (!isProcessingForm) $("#planejamentoForm").submit();
    preencherSubMenuPlanejamentos();
    gerarOpcoesSelectAddPlanejamentoModal();
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
});

$(document).ready(function () {
  preencherSubMenuPlanejamentos();
  gerarOpcoesSelectAddPlanejamentoModal();
});

// Adicionar Lançamento
$(document).ready(function () {
  var isProcessingForm = false;

  $("#adicionarFormPlanejamento").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) {
      return;
    }

    isProcessingForm = true;

    var nomePlanejamento = $("#categoriaAdicionarPlanejamento option:selected")
      .val()
      .trim();
    var valor = $("#valorAdicionarPlanejamento").val().trim();
    var descricao = $("#descricaoAdicionarPlanejamento").val().trim();
    var data = $("#dataAdicionarPlanejamento").val().trim();

    if (valor === "" || data === "") {
      exibirToast("Por favor, preencha todos os campos!", "#871919");
      isProcessingForm = false;
      return;
    }
    var planejamentoExistente = planejamentos.find(function (categoria) {
      return categoria.nome === nomePlanejamento;
    });

    if (!planejamentoExistente) {
      exibirToast("Categoria não encontrada!", "#871919");
      isProcessingForm = false;
      return;
    }

    planejamentoExistente.lancamentos.push({
      id: crypto.randomUUID(),
      valor: parseFloat(valor.replace(",", ".")),
      descricao: descricao,
      data: data,
      created_at: new Date(),
    });

    exibirToast("Lançamento adicionado com sucesso!", "#198754");

    $("#modalAdicionarPlanejamento").modal("hide");
    isProcessingForm = false;
  });
});
