var categoriasGasto = [
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
];

function preencherSubMenuGastos() {
  var submenuGastos = document.getElementById("submenuGastos");
  submenuGastos.innerHTML = "";

  categoriasGasto.forEach(function (categoria) {
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
      exibirGastos(categoria.gastos);
    });

    submenuGastos.appendChild(li);
  });
}

preencherSubMenuGastos();

$(document).ready(function () {
  $("#modalCategoriaGasto").on("hidden.bs.modal", function () {

    $("#categoriaFormGasto")[0].reset();

    $("#nomeCategoriaGasto").removeClass("is-valid is-invalid");
  });

  $("#nomeCategoriaGasto").on("input", function () {
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

    $("#categoriaFormGasto").submit(function (event) {
      event.preventDefault();

      if (isProcessingForm) {
        return;
      }

      isProcessingForm = true;

      var nomeCategoria = $("#nomeCategoriaGasto").val().trim();
      var icon = $("#iconeCategoriaGasto .btn-secondary").attr("data-icon");

      if (nomeCategoria === "") {
        $("#nomeCategoriaGasto").addClass("is-invalid");
        isProcessingForm = false;
        return;
      }

      var categoriaExistente = categoriasGasto.find(function (categoria) {
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
          onClick: function () { }
        }).showToast();
        isProcessingForm = false;
        return;
      }

      categoriasGasto.push({
        nome: nomeCategoria,
        icone: icon,
        gastos: [],
        created_at: new Date(),
      });

      console.log(categoriasGasto)

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
        onClick: function () { }
      }).showToast();

      preencherSubMenuGastos();

      $("#modalCategoriaGasto").modal("hide");

      isProcessingForm = false;
    });

    $(".dropdown-item").click(function () {
      var icon = $(this).attr("data-icon");
      var text = $(this).text();
      var button = $(this).closest(".dropdown").find(".btn-secondary");
      button.attr("data-icon", icon);
      button.html('<i class="' + icon + '"></i> ' + text);
    });

    $("#modalCategoriaGasto").on("hidden.bs.modal", function () {
      var defaultIcon = "fas fa-layer-group"; // Ícone padrão
      var button = $("#iconeCategoriaGasto .btn-secondary");
      var defaultText = '<i class="' + defaultIcon + '"></i>';
      button.attr("data-icon", defaultIcon);
      button.html(defaultText);
    });

    $("#btnAdicionarCategoriaGasto").on('click', function (event) {
      event.preventDefault();
      if (!isProcessingForm) {
        $("#categoriaFormGasto").submit();


      }
    });

    preencherSubMenuGastos();
  });
});
