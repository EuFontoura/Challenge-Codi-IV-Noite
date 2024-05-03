var planejamentos = [];

// function salvarPlanejamentos() {
//   localStorage.setItem("planejamentos", JSON.stringify(planejamentos));
// }

// function recuperarPlanejamentos() {
//   var planejamentosSalvos = localStorage.getItem("planejamentos");
//   if (planejamentosSalvos) {
//     planejamentos = JSON.parse(planejamentosSalvos);
//   }
// }

// document.addEventListener("DOMContentLoaded", recuperarPlanejamentos);

// window.addEventListener("beforeunload", salvarPlanejamentos);

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
});

$(document).ready(function () {
  preencherSubMenuPlanejamentos();

});


const atualizarTabelaPlanejamento = (planejamento) => {
  const corpoTabela = document.getElementById("corpo-tabela-planejamento");
  corpoTabela.innerHTML = "";

  planejamento.lancamentos.forEach((lancamento) =>{
    const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
            <td class="td-gasto">${lancamento.data}</td>
            <td class="td-gasto">R$ ${lancamento.valor}</td>
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

  const titulo = document.getElementById('chartTitlePlanejamento');
  titulo.innerHTML = planejamento.nome;

  const meta = document.getElementById('meta');
  meta.innerHTML = planejamento.meta;

  atualizarTabelaPlanejamento(planejamento);

  console.log(typeof(planejamento.meta))

  atualizarMeta();
}

function atualizarMeta(){
  const planejamento = planejamentos.find((p) => {
    return p.nome === document.getElementById("chartTitlePlanejamento").textContent;
  });

  const valorTotalInvestido = planejamento.lancamentos.reduce((total, lancamento) => {
    return total + lancamento.valor;
  }, 0);

  planejamento.meta.parseFloat = planejamento.meta.parseFloat - valorTotalInvestido.parseFloat;

  console.log(planejamento.meta);
};



