// Lista de nomes dos meses
const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

let mesIndex = new Date().getMonth(); // Índice do mês atual

// Função para atualizar o mês exibido
function atualizarMes() {
    const mesAtualElement = document.querySelector('.mes-atual');
    mesAtualElement.textContent = meses[mesIndex];
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