function meta(id) {
  let valor = 0;
  const planejamento = planejamentos.find((p) => p.id === id);

  if (planejamento) {
    valor = planejamento.meta;
    const spanMeta = document.getElementById("meta");
    spanMeta.textContent = `R$ ${valor}`;
    console.log("🚀 ~ meta ~ planejamento.meta:", valor);
  } else {
    console.log("Planejamento não encontrado para o ID fornecido.");
  }
}

// Você precisa chamar essa função com o ID da categoria desejada quando a categoria for clicada.
// Por exemplo:
// meta('idDaCategoria');
