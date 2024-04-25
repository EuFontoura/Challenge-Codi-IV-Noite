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

let mesIndex = new Date().getMonth();

// Função para atualizar o mês exibido
function atualizarMes() {
  const mesAtualElement = document.querySelector(".mes-atual");
  mesAtualElement.textContent = meses[mesIndex];

  const categoriasComGastosJulho = categoriasGasto.filter((categoria) =>
    categoria.gastos.some((gasto) => {
      const partesData = gasto.data.split("/");
      const mesGasto = parseInt(partesData[1], 10);
      return mesGasto === mesIndex + 1;
    })
  );

  const categoriasAtualizadas = categoriasComGastosJulho.map((categoria) => ({
    ...categoria,
    gastos: categoria.gastos.filter((gasto) => {
      const partesData = gasto.data.split("/");
      const mesGasto = parseInt(partesData[1], 10);
      return mesGasto === mesIndex + 1;
    }),
  }));
  atualizarGraficoCategorias(categoriasAtualizadas);
}

// Função para avançar para o próximo mês
function mesProximo() {
  mesIndex = (mesIndex + 1) % 12;
  atualizarMes();
}

// Função para retroceder para o mês anterior
function mesAnterior() {
  mesIndex = (mesIndex - 1 + 12) % 12;
  atualizarMes();
}

// Inicializar o mês atual
atualizarMes();

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
