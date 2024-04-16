var categoriasReceita = [
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
];

function preencherSubMenuReceitas() {
  var submenuReceitas = document.getElementById("submenuReceitas");
  submenuReceitas.innerHTML = "";
  categoriasReceita.forEach(function (categoria) {
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

$(document).ready(function () {
  $("#modalCategoriaReceita").on("hidden.bs.modal", function () {
    $("#categoriaFormReceita")[0].reset();
    $("#nomeCategoriaReceita").removeClass("is-valid is-invalid");
  });

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

      var categoriaExistente = categoriasReceita.find(function (categoria) {
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

      categoriasReceita.push({
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
      event.preventDefault(); // Evita a ação padrão do botão
      if (!isProcessingForm) {
        $("#categoriaFormReceita").submit();
      }
      console.log(categoriasReceita);
    });
    preencherSubMenuReceitas();
  });
});
