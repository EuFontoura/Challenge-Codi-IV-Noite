var categorias = {
  categoriasGasto: [
    {
      id: crypto.randomUUID(),
      nome: "Alimentação",
      icone: "fas fa-utensils",
      gastos: [],
      created_at: new Date(),
    },
    {
      id: crypto.randomUUID(),
      nome: "Transporte",
      icone: "fas fa-car",
      gastos: [],
      created_at: new Date(),
    },
    {
      id: crypto.randomUUID(),
      nome: "Moradia",
      icone: "fas fa-home",
      gastos: [],
      created_at: new Date(),
    },
  ],
  categoriasReceita: [
    {
      id: crypto.randomUUID(),
      nome: "Salário",
      icone: "fas fa-wallet",
      receitas: [],
      created_at: new Date(),
    },
    {
      id: crypto.randomUUID(),
      nome: "Vendas",
      icone: "fas fa-handshake",
      receitas: [],
      created_at: new Date(),
    },
  ],
};

function salvarCategorias() {
  localStorage.setItem("categorias", JSON.stringify(categorias));
}

function recuperarCategorias() {
  var categoriasSalvas = localStorage.getItem("categorias");
  if (categoriasSalvas) {
    categorias = JSON.parse(categoriasSalvas);
  }
}

document.addEventListener("DOMContentLoaded", recuperarCategorias);

window.addEventListener("beforeunload", salvarCategorias);

/* CRUD */

// Adicionar Categoria
$(document).ready(function () {
  var isProcessingForm = false;

  $("#categoriaForm").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) return;
    isProcessingForm = true;

    var nomeCategoria = $("#nomeCategoria").val().trim();
    var icon = $("#iconeCategoria .btn-secondary").attr("data-icon");
    var tipoCategoria = $("#tipoCategoria").val();

    if (!nomeCategoria) {
      $("#nomeCategoria").addClass("is-invalid");
      isProcessingForm = false;
      return;
    }

    var novaCategoria = {
      id: crypto.randomUUID(),
      nome: nomeCategoria,
      icone: icon,
      created_at: new Date(),
    };

    var categoriasArray = categorias["categorias" + tipoCategoria];
    var categoriaExistente = categoriasArray.find(
      (categoria) => categoria.nome === nomeCategoria
    );

    if (categoriaExistente) {
      exibirToast("Categoria já existe!", "#871919");
      isProcessingForm = false;
      return;
    }

    novaCategoria[tipoCategoria.toLowerCase() + "s"] = [];
    categoriasArray.push(novaCategoria);

    exibirToast("Categoria adicionada com sucesso!", "#198754");
    preencherSubMenuGastos();
    gerarOpcoesSelectAddGastoModal();
    $("#modalCategoria").modal("hide");

    isProcessingForm = false;
  });

  resetModal();

  $("#btnAddCategoria").on("click", function (event) {
    event.preventDefault();
    if (!isProcessingForm) $("#categoriaForm").submit();
    preencherSubMenuGastos();
    preencherSubMenuReceitas();
  });
});

// Reseta modal
function resetModal() {
  $("#modalCategoria").on("hidden.bs.modal", function () {
    $("#categoriaForm")[0].reset();
    $("#nomeCategoria").removeClass("is-valid is-invalid");
  });
}

// Valida modal
$(document).ready(function () {
  $("#nomeCategoria").on("input", function () {
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
});
