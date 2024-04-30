const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

var mesIndex = new Date().getMonth();
const mesAtualElement = document.querySelector(".mes-atual");
mesAtualElement.textContent = meses[mesIndex];

function verificarLancamentosMes() {
  const conteudoMes = document.querySelector(".conteudo-mes");
  const msgSemLancamento = document.querySelector(".msg-sem-lancamento");

  if (conteudoMes) {
    const temGastos = categorias.categoriasGasto.some((categoria) =>
      categoria.gastos.some((gasto) => {
        const partesData = gasto.data.split("/");
        const mesGasto = parseInt(partesData[1], 10);
        return mesGasto === mesIndex + 1;
      })
    );

    const temReceitas = categorias.categoriasReceita.some((categoria) =>
      categoria.receitas.some((receita) => {
        const partesData = receita.data.split("/");
        const mesReceita = parseInt(partesData[1], 10);
        return mesReceita === mesIndex + 1;
      })
    );

    if (!temGastos && !temReceitas) {
      conteudoMes.style.display = "none";
      msgSemLancamento.style.display = "flex";
    }
    if (temGastos || temReceitas) {
      conteudoMes.style.display = "flex";
      msgSemLancamento.style.display = "none";
    }
  }
}

// Chamada da função após atualizar os gastos e as receitas
verificarLancamentosMes();

// Função para avançar para o próximo mês
function mesProximo() {
  mesIndex = (mesIndex + 1) % 12;
  const mesAtualElement = document.querySelector(".mes-atual");
  mesAtualElement.textContent = meses[mesIndex];
  verificarLancamentosMes();
  atualizarGraficos(categorias.categoriasGasto, categorias.categoriasReceita);
}

// Função para retroceder para o mês anterior
function mesAnterior() {
  mesIndex = (mesIndex - 1 + 12) % 12;
  const mesAtualElement = document.querySelector(".mes-atual");
  mesAtualElement.textContent = meses[mesIndex];
  verificarLancamentosMes();
  atualizarGraficos(categorias.categoriasGasto, categorias.categoriasReceita);
}

$("#dataAdicionarDespesa").flatpickr({
  enableTime: true,
  dateFormat: "d/m/Y ",
  enableTime: false,
});
$("#dataAdicionarReceita").flatpickr({
  enableTime: true,
  dateFormat: "d/m/Y ",
  enableTime: false,
});

$(document).ready(function () {
  verificarLancamentosMes();
  atualizarGraficos(categorias.categoriasGasto, categorias.categoriasReceita);
});
