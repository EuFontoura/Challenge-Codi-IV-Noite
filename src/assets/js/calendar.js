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

// Função para atualizar os gastos mensais
function atualizarGastosMes() {
  const mesAtualElement = document.querySelector(".mes-atual");
  mesAtualElement.textContent = meses[mesIndex];

  const categoriasComGasto = categoriasGasto.filter((categoria) =>
    categoria.gastos.some((gasto) => {
      const partesData = gasto.data.split("/");
      const mesGasto = parseInt(partesData[1], 10);
      return mesGasto === mesIndex + 1;
    })
  );

  const categoriasAtualizadas = categoriasComGasto.map((categoria) => ({
    ...categoria,
    gastos: categoria.gastos.filter((gasto) => {
      const partesData = gasto.data.split("/");
      const mesGasto = parseInt(partesData[1], 10);
      return mesGasto === mesIndex + 1;
    }),
  }));
  atualizarGraficoGastos(categoriasAtualizadas);
}

// Função para atualizar as receitas mensais
function atualizarReceitasMes() {
  const mesAtualElement = document.querySelector(".mes-atual");
  mesAtualElement.textContent = meses[mesIndex];

  const categoriasComReceita = categoriasReceita.filter((categoria) =>
    categoria.receitas.some((receita) => {
      const partesData = receita.data.split("/");
      const mesGasto = parseInt(partesData[1], 10);
      return mesGasto === mesIndex + 1;
    })
  );

  const categoriasAtualizadas = categoriasComReceita.map((categoria) => ({
    ...categoria,
    gastos: categoria.receitas.filter((receita) => {
      const partesData = receita.data.split("/");
      const mesGasto = parseInt(partesData[1], 10);
      return mesGasto === mesIndex + 1;
    }),
  }));
  atualizarGraficoReceitas(categoriasAtualizadas);
}

// Função para avançar para o próximo mês
function mesProximo() {
  mesIndex = (mesIndex + 1) % 12;
  atualizarGastosMes();
  atualizarReceitasMes();
}

// Função para retroceder para o mês anterior
function mesAnterior() {
  mesIndex = (mesIndex - 1 + 12) % 12;
  atualizarGastosMes();
  atualizarReceitasMes();
}

// Inicializar o mês atual
atualizarGastosMes();
atualizarReceitasMes();


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
