// Preencher select com options de categoria
function gerarOpcoesSelectAddPlanejamentoModal() {
    var selectCategoria = document.getElementById("categoriaAdicionarPlanejamento");
    selectCategoria.innerHTML = "";
  
    categorias.categoriasPlanejamento.forEach(function (categoria) {
      var option = document.createElement("option");
      option.value = categoria.nome;
      option.text = categoria.nome;
      selectCategoria.appendChild(option);
    });
  }
  gerarOpcoesSelectAddPlanejamentoModal();
  
  // Adicionar Planejamento
  $(document).ready(function () {
    var isProcessingForm = false;
  
    $("#adicionarFormPlanejamento").submit(function (event) {
      event.preventDefault();
  
      if (isProcessingForm) {
        return;
      }
  
      isProcessingForm = true;
  
      var nomeCategoria = $("#categoriaAdicionarPlanejamento option:selected")
        .val()
        .trim();
      var nomePlanejamento = $("#nomeAdicionarPlanejamento").val().trim();
      var valorPlanejamento = $("#valorAdicionarPlanejamento").val().trim();
      var descricaoPlanejamento = $("#descricaoAdicionarPlanejamento").val().trim();
      var dataPlanejamento = $("#dataAdicionarPlanejamento").val().trim();
  
      if (
        nomeCategoria === "" ||
        nomePlanejamento === "" ||
        valorPlanejamento === "" ||
        dataPlanejamento === ""
      ) {
        exibirToast("Por favor, preencha todos os campos!", "#871919");
        isProcessingForm = false;
        return;
      }
  
      var categoriaExistente = categorias.categoriasPlanejamento.find(function (
        categoria
      ) {
        return categoria.nome === nomeCategoria;
      });
  
      if (!categoriaExistente) {
        exibirToast("Categoria não encontrada!", "#871919");
        isProcessingForm = false;
        return;
      }
  
      categoriaExistente.planejamentos.push({
        id: crypto.randomUUID(),
        nome: nomePlanejamento,
        valor: parseFloat(valorPlanejamento.replace(",", ".")),
        descricao: descricaoPlanejamento,
        data: dataPlanejamento,
        created_at: new Date(),
      });
  
      exibirToast("Planejamento adicionado com sucesso!", "#198754");
  
      $("#modalAdicionarPlanejamento").modal("hide");
      verificarLancamentosMes();
      atualizarTabela();
      isProcessingForm = false;
    });
  });