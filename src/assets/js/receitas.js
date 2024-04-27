
// Preenche o submenu da sidebar com as categorias
function preencherSubMenuReceitas() {
  var submenuReceitas = document.getElementById("submenuReceitas");
  submenuReceitas.innerHTML = "";

  categorias.categoriasReceita.forEach(function (categoria) {
    var li = document.createElement("li");

    li.classList.add("menu-item");

    var a = document.createElement("a");

    a.setAttribute("href", "#");

    var icon = document.createElement("i");

    icon.className = categoria.icone;

    a.appendChild(icon);

    a.appendChild(document.createTextNode(" "));

    a.appendChild(document.createTextNode(categoria.nome));

    li.appendChild(a);

    li.addEventListener("click", function () {
      exibirReceitas(categoria.receitas);
    });

    submenuReceitas.appendChild(li);
  });
}

preencherSubMenuReceitas();

// Reseta modal
$(document).ready(function () {
  $("#modalCategoriaReceita").on("hidden.bs.modal", function () {
    $("#categoriaFormReceita")[0].reset();
    $("#nomeCategoriaReceita").removeClass("is-valid is-invalid");
  });
});

// Valida modal
$("#nomeCategoriaReceita").on("input", function () {
  var nomeCategoria = $(this).val().trim();
  nomeCategoria = nomeCategoria.replace(/[^a-zA-ZÀ-ÿ ]/g, "");

  if (nomeCategoria !== "") {
    var nomeCapitalizado =
      nomeCategoria.charAt(0).toUpperCase() +
      nomeCategoria.slice(1).toLowerCase();
    $(this).val(nomeCapitalizado);
  }

  if (nomeCategoria === "") {
    $(this).removeClass("is-valid").addClass("is-invalid");
  } else {
    $(this).removeClass("is-invalid").addClass("is-valid");
  }
});

// Preencher select com options de categoria
function gerarOpcoesSelectAddReceitaModal() {
  var selectCategoria = document.getElementById("categoriaAdicionarReceita");
  selectCategoria.innerHTML = "";

  categorias.categoriasReceita.forEach(function (categoria) {
    var option = document.createElement("option");
    option.value = categoria.nome;
    option.text = categoria.nome;
    selectCategoria.appendChild(option);
  });
}
gerarOpcoesSelectAddReceitaModal();

// Adicionar Categoria
$(document).ready(function () {
  var isProcessingForm = false;

  $("#categoriaFormReceita").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) {
      return;
    }

    isProcessingForm = true;

    var nomeCategoria = $("#nomeCategoriaReceita").val().trim();
    var icon = $("#iconeCategoriaReceita .btn-secondary").attr("data-icon");

    if (nomeCategoria === "") {
      $("#nomeCategoriaReceita").addClass("is-invalid");
      isProcessingForm = false;
      return;
    }

    var categoriaExistente = categorias.categoriasReceita.find(function (categoria) {
      return categoria.nome === nomeCategoria;
    });

    if (categoriaExistente) {
      Toastify({
        text: "Categoria já existe!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#871919",
        },
        onClick: function () { },
      }).showToast();
      isProcessingForm = false;
      return;
    }

    categorias.categoriasReceita.push({
      nome: nomeCategoria,
      icone: icon,
      receitas: [],
      created_at: new Date(),
    });

    Toastify({
      text: "Categoria adicionada com sucesso!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#198754",
      },
      onClick: function () { },
    }).showToast();

    preencherSubMenuReceitas();
    gerarOpcoesSelectAddReceitaModal();

    $("#modalCategoriaReceita").modal("hide");

    isProcessingForm = false;
  });

  $(".dropdown-item").click(function () {
    var icon = $(this).attr("data-icon");
    var text = $(this).text();
    var button = $(this).closest(".dropdown").find(".btn-secondary");
    button.attr("data-icon", icon);
    button.html('<i class="' + icon + '"></i> ' + text);
  });

  $("#modalCategoriaReceita").on("hidden.bs.modal", function () {
    var defaultIcon = "fas fa-dollar-sign"; // Ícone padrão
    var button = $("#iconeCategoriaReceita .btn-secondary");
    var defaultText = '<i class="' + defaultIcon + '"></i>';
    button.attr("data-icon", defaultIcon);
    button.html(defaultText);
  });

  $("#btnAdicionarCategoriaReceita").on("click", function (event) {
    event.preventDefault();
    if (!isProcessingForm) {
      $("#categoriaFormReceita").submit();
    }
  });
});

preencherSubMenuReceitas();

// Adicionar receita

$(document).ready(function () {
  var isProcessingForm = false;

  $("#adicionarFormReceita").submit(function (event) {
    event.preventDefault();

    if (isProcessingForm) {
      return;
    }

    isProcessingForm = true;

    var nomeCategoria = $("#categoriaAdicionarReceita option:selected")
      .val()
      .trim();
    var nomeReceita = $("#nomeAdicionarReceita").val().trim();
    var valorReceita = $("#valorAdicionarReceita").val().trim();
    var descricaoReceita = $("#descricaoAdicionarReceita").val().trim();
    var dataReceita = $("#dataAdicionarReceita").val().trim();

    if (
      nomeCategoria === "" ||
      nomeReceita === "" ||
      valorReceita === "" ||
      dataReceita === ""
    ) {
      Toastify({
        text: "Por favor, preencha todos os campos!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#871919",
        },
        onClick: function () { },
      }).showToast();
      isProcessingForm = false;
      return;
    }

    var categoriaExistente = categorias.categoriasReceita.find(function (categoria) {
      return categoria.nome === nomeCategoria;
    });

    if (!categoriaExistente) {
      Toastify({
        text: "Categoria não encontrada!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#871919",
        },
        onClick: function () { },
      }).showToast();
      isProcessingForm = false;
      return;
    }

    categoriaExistente.receitas.push({
      nome: nomeReceita,
      valor: parseFloat(valorReceita.replace(",", ".")),
      descricao: descricaoReceita,
      data: dataReceita,
      created_at: new Date(),
    });

    Toastify({
      text: "Receita adicionado com sucesso!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#198754",
      },
      onClick: function () { },
    }).showToast();

    $("#modalAdicionarReceita").modal("hide");
    verificarLancamentosMes();
    atualizarGraficos(categorias.categoriasGasto, categorias.categoriasReceita);
    isProcessingForm = false;
  });
});
