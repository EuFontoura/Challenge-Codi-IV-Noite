
// Adicionar lançamento
$(document).ready(function (id) {
  var isProcessingForm = false;

  $("#adicionarFormLancamento").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) {
      return;
    }

    isProcessingForm = true;

    var valorLancamento = $("#valorLancamento").val().trim();
    var dataLancamento = $("#dataLancamento").val().trim();

    if (
      valorLancamento === "" ||
      dataLancamento === ""
    ) {
      exibirToast("Por favor, preencha todos os campos!", "#871919");
      isProcessingForm = false;
      return;
    }

    const planejamento = planejamentos.find((p) => {
      return p.nome === document.getElementById("titlePlanejamento").textContent;
    });

    planejamento.lancamentos.push({
      id: crypto.randomUUID(),
      valor: parseFloat(valorLancamento.replace(",", ".")),
      data: dataLancamento,
      created_at: new Date(),
    });

    exibirToast("Lançamento adicionado com sucesso!", "#198754");

    $("#modalAdicionarLancamento").modal("hide");
    atualizarTabelaPlanejamento(planejamento);
    acumularInvestimento(planejamento)
    isProcessingForm = false;
  });
});


