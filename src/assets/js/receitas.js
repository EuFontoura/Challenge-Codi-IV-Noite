// Preencher select com options de categoria
function gerarOpcoesSelectAddReceitaModal() {
  var selectCategoria = document.getElementById("categoriaAdicionarReceita");
  selectCategoria.innerHTML = "";

  categorias.categoriasReceita.forEach(function (categoria) {
    var option = document.createElement("option");
    option.value = categoria.nome;
    option.text = categoria.nome;
    selectCategoria.appendChild(option);
  });
}
gerarOpcoesSelectAddReceitaModal();

// Adicionar receita
$(document).ready(function () {
  var isProcessingForm = false;

  $("#adicionarFormReceita").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) {
      return;
    }

    isProcessingForm = true;

    var nomeCategoria = $("#categoriaAdicionarReceita option:selected")
      .val()
      .trim();
    var nomeReceita = $("#nomeAdicionarReceita").val().trim();
    var valorReceita = $("#valorAdicionarReceita").val().trim();
    var descricaoReceita = $("#descricaoAdicionarReceita").val().trim();
    var dataReceita = $("#dataAdicionarReceita").val().trim();

    if (
      nomeCategoria === "" ||
      nomeReceita === "" ||
      valorReceita === "" ||
      dataReceita === ""
    ) {
      exibirToast("Por favor, preencha todos os campos!", "#871919");
      isProcessingForm = false;
      return;
    }

    var categoriaExistente = categorias.categoriasReceita.find(function (
      categoria
    ) {
      return categoria.nome === nomeCategoria;
    });

    if (!categoriaExistente) {
      exibirToast("Categoria não encontrada!", "#871919");
      isProcessingForm = false;
      return;
    }

    categoriaExistente.receitas.push({
      id: crypto.randomUUID(),
      nome: nomeReceita,
      valor: parseFloat(valorReceita.replace(",", ".")),
      descricao: descricaoReceita,
      data: dataReceita,
      created_at: new Date(),
    });

    exibirToast("Receita adicionada com sucesso!", "#198754");

    $("#modalAdicionarReceita").modal("hide");
    verificarLancamentosMes();
    atualizarTabela();
    saldoMensal();
    atualizarGraficos(categorias.categoriasGasto, categorias.categoriasReceita);
    isProcessingForm = false;
  });
});
