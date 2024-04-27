
var categorias = {
    categoriasGasto: [
        {
            nome: "Alimentação",
            icone: "fas fa-utensils",
            gastos: [],
            created_at: new Date(),
        },
        {
            nome: "Transporte",
            icone: "fas fa-car",
            gastos: [],
            created_at: new Date(),
        },
        {
            nome: "Moradia",
            icone: "fas fa-home",
            gastos: [],
            created_at: new Date(),
        },
    ],
    categoriasReceita: [
        {
            nome: "Salário",
            icone: "fas fa-wallet",
            receitas: [],
            created_at: new Date(),
        },
        {
            nome: "Vendas",
            icone: "fas fa-handshake",
            receitas: [],
            created_at: new Date(),
        },
    ]
};

function salvarCategorias() {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

function recuperarCategorias() {
    var categorias = localStorage.getItem('categorias');
    if (categorias) {
        categorias = JSON.parse(categorias);
    }
}

  
document.addEventListener('DOMContentLoaded', recuperarCategorias);
  
window.addEventListener('beforeunload', salvarCategorias);
  