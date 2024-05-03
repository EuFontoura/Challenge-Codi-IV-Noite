
planejamentos: [
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
]
  
// Adicionar Lançamento
  $(document).ready(function () {
    var isProcessingForm = false;
  
    $("#adicionarFormPlanejamento").submit(function (event) {
      event.preventDefault();
  
      if (isProcessingForm) {
        return;
      }
  
      isProcessingForm = true;

      var valor = $("#valorLancamento").val().trim();
      var data = $("#dataLancamento").val().trim();
  
      if (
        valor === "" ||
        data === ""
      ) {
        exibirToast("Por favor, preencha todos os campos!", "#871919");
        isProcessingForm = false;
        return;
      }
  
      planejamentos.lancamentos.push({
        id: crypto.randomUUID(),
        valor: parseFloat(valor.replace(",", ".")),
        data: data,
        created_at: new Date(),
      });
  
      exibirToast("Lançamento adicionado com sucesso!", "#198754");
  
      $("#modalAdicionarLancamento").modal("hide");
      isProcessingForm = false;
    });
  });