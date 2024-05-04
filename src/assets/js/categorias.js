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

function preencherSelectCategorias() {
  var selectCategorias = document.getElementById("filtro-categorias");
  selectCategorias.innerHTML = "";

  var todasCategoriasOption = document.createElement("option");
  todasCategoriasOption.value = "";
  todasCategoriasOption.textContent = "Todas as categorias";
  selectCategorias.appendChild(todasCategoriasOption);

  categorias.categoriasGasto.forEach(function (categoria) {
    var option = document.createElement("option");
    option.value = categoria.nome;
    option.textContent = categoria.nome;
    selectCategorias.appendChild(option);
  });
  categorias.categoriasReceita.forEach(function (categoria) {
    var option = document.createElement("option");
    option.value = categoria.nome;
    option.textContent = categoria.nome;
    selectCategorias.appendChild(option);
  });
}

// Chame a função para preencher o select quando necessário
preencherSelectCategorias();

// Função para atualizar a tabela de acordo com a categoria selecionada e o mês atual
const atualizarTabela = () => {
  const filtro = document.getElementById("filtro-categorias").value;
  const corpoTabela = document.getElementById("corpo-tabela");
  corpoTabela.innerHTML = "";

  const mesAtual = meses[mesIndex];

  categorias.categoriasGasto.forEach((categoria) => {
    if (filtro === "" || categoria.nome === filtro) {
      categoria.gastos.forEach((gasto) => {
        const partesData = gasto.data.split("/");
        const mesGasto = parseInt(partesData[1], 10);
        if (meses[mesGasto - 1] === mesAtual) {
          const novaLinha = document.createElement("tr");
          novaLinha.innerHTML = `
            <td class="td-gasto">${gasto.data}</td>
            <td class="td-gasto">${gasto.nome}</td>
            <td class="td-gasto">R$ ${gasto.valor}</td>
          `;
          corpoTabela.appendChild(novaLinha);
        }
      });
    }
  });

  categorias.categoriasReceita.forEach((categoria) => {
    if (filtro === "" || categoria.nome === filtro) {
      categoria.receitas.forEach((receita) => {
        const partesData = receita.data.split("/");
        const mesReceita = parseInt(partesData[1], 10);
        if (meses[mesReceita - 1] === mesAtual) {
          const novaLinha = document.createElement("tr");
          novaLinha.innerHTML = `
            <td class="td-receita">${receita.data}</td>
            <td class="td-receita">${receita.nome}</td>
            <td class="td-receita">R$ ${receita.valor}</td>
          `;
          corpoTabela.appendChild(novaLinha);
        }
      });
    }
  });
};

const filtroCategorias = document.getElementById("filtro-categorias");
filtroCategorias.addEventListener("change", atualizarTabela);

// Atualizar a tabela e os gráficos quando o documento estiver pronto
$(document).ready(function () {
  verificarLancamentosMes();
  atualizarTabela();
  atualizarGraficos(categorias.categoriasGasto, categorias.categoriasReceita);
});

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


// Adicionar Categoria Gastos e Receitas
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
    $("#modalCategoria").modal("hide");

    isProcessingForm = false;
  });

  resetModal();

  $("#btnAddCategoria").on("click", function (event) {
    event.preventDefault();
    if (!isProcessingForm) $("#categoriaForm").submit();
    preencherSubMenuGastos();
    preencherSubMenuReceitas();
    gerarOpcoesSelectAddGastoModal();
    gerarOpcoesSelectAddReceitaModal();
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

$(document).ready(function () {
  preencherSubMenuGastos();
  preencherSubMenuReceitas();
});

function home() {
  $(".main").css({ display: "flex" });
  $(".main-planejamento").css({ display: "none" });
}
