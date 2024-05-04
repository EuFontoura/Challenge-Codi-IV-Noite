// Preencher select com options de categoria
function gerarOpcoesSelectAddGastoModal() {
  var selectCategoria = document.getElementById("categoriaAdicionarDespesa");
  selectCategoria.innerHTML = "";

  categorias.categoriasGasto.forEach(function (categoria) {
    var option = document.createElement("option");
    option.value = categoria.nome;
    option.text = categoria.nome;
    selectCategoria.appendChild(option);
  });
}
gerarOpcoesSelectAddGastoModal();

// Adicionar despesa
$(document).ready(function () {
  var isProcessingForm = false;

  $("#adicionarFormDespesa").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) {
      return;
    }

    isProcessingForm = true;

    var nomeCategoria = $("#categoriaAdicionarDespesa option:selected")
      .val()
      .trim();
    var nomeGasto = $("#nomeAdicionarDespesa").val().trim();
    var valorGasto = $("#valorAdicionarDespesa").val().trim();
    var descricaoGasto = $("#descricaoAdicionarDespesa").val().trim();
    var dataGasto = $("#dataAdicionarDespesa").val().trim();

    if (
      nomeCategoria === "" ||
      nomeGasto === "" ||
      valorGasto === "" ||
      dataGasto === ""
    ) {
      exibirToast("Por favor, preencha todos os campos!", "#871919");
      isProcessingForm = false;
      return;
    }

    var categoriaExistente = categorias.categoriasGasto.find(function (
      categoria
    ) {
      return categoria.nome === nomeCategoria;
    });

    if (!categoriaExistente) {
      exibirToast("Categoria não encontrada!", "#871919");
      isProcessingForm = false;
      return;
    }

    categoriaExistente.gastos.push({
      id: crypto.randomUUID(),
      nome: nomeGasto,
      valor: parseFloat(valorGasto.replace(",", ".")),
      descricao: descricaoGasto,
      data: dataGasto,
      created_at: new Date(),
    });

    exibirToast("Gasto adicionado com sucesso!", "#198754");

    $("#modalAdicionarDespesa").modal("hide");
    verificarLancamentosMes();
    atualizarTabela();
    saldoMensal();
    atualizarGraficos(categorias.categoriasGasto, categorias.categoriasReceita);
    isProcessingForm = false;
  });
});
