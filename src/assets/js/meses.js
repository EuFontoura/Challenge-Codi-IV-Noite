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

// Função para avançar para o próximo mês
function mesProximo() {
    mesIndex = (mesIndex + 1) % 12;
    const mesAtualElement = document.querySelector(".mes-atual");
    mesAtualElement.textContent = meses[mesIndex];
}

// Função para retroceder para o mês anterior
function mesAnterior() {
    mesIndex = (mesIndex - 1 + 12) % 12;
    const mesAtualElement = document.querySelector(".mes-atual");
    mesAtualElement.textContent = meses[mesIndex];
}