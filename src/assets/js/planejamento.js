var categoriasPlanejamento = [
  {
    nome: "Comprar Carro",
    icone: "fa-solid fa-car-side",
    receitas: [],
    created_at: new Date(),
  },
  {
    nome: "Poupança",
    icone: "fas fa-piggy-bank",
    receitas: [],
    created_at: new Date(),
  },
];

function preencherSubMenuPlanejamento() {
  var submenuReceitas = document.getElementById("submenuPlanejamento");
  submenuReceitas.innerHTML = "";

  categoriasPlanejamento.forEach(function (categoria) {
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
preencherSubMenuPlanejamento();

$(document).ready(function () {
  $("#modalCategoriaPlanejamento").on("hidden.bs.modal", function () {

    $("#categoriaFormPlanejamento")[0].reset();

    $("#nomeCategoriaPlanejamento").removeClass("is-valid is-invalid");
  });

  $("#nomeCategoriaPlanejamento").on("input", function () {
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

    $("#categoriaFormPlanejamento").submit(function (event) {
      event.preventDefault();

      if (isProcessingForm) {
        return;
      }

      isProcessingForm = true;

      var nomeCategoria = $("#nomeCategoriaPlanejamento").val().trim();
      var icon = $("#iconeCategoriaPlanejamento .btn-secondary").attr(
        "data-icon"
      );

      if (nomeCategoria === "") {
        $("#nomeCategoriaPlanejamento").addClass("is-invalid");
        isProcessingForm = false;
        return;
      }

      var categoriaExistente = categoriasPlanejamento.find(function (
        categoria
      ) {
        return categoria.nome === nomeCategoria;
      });

      if (categoriaExistente) {
        Toastify({
          text: "Planejamento já existe!",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#871919",
          },
          onClick: function () {},
        }).showToast();
        isProcessingForm = false;
        return;
      }

      categoriasPlanejamento.push({
        nome: nomeCategoria,
        icone: icon,
        receitas: [],
      });

      Toastify({
        text: "Planejamento adicionado com sucesso!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#198754",
        },
        onClick: function () {},
      }).showToast();
      preencherSubMenuPlanejamento();

      $("#modalCategoriaPlanejamento").modal("hide");

      isProcessingForm = false;
    });

    $(".dropdown-item").click(function () {
      var icon = $(this).attr("data-icon");
      var text = $(this).text();
      var button = $(this).closest(".dropdown").find(".btn-secondary");
      button.attr("data-icon", icon);
      button.html('<i class="' + icon + '"></i> ' + text);
    });

    $("#modalCategoriaPlanejamento").on("hidden.bs.modal", function () {
      var defaultIcon = "fas fa-dollar-sign";
      var button = $("#iconeCategoriaPlanejamento .btn-secondary");
      var defaultText = '<i class="' + defaultIcon + '"></i>';
      button.attr("data-icon", defaultIcon);
      button.html(defaultText);
    });

    $("#btnAdicionarCategoriaPlanejamento").on("click", function (event) {
      event.preventDefault();
      if (!isProcessingForm) {
        $("#categoriaFormPlanejamento").submit();
      }
    });
    preencherSubMenuPlanejamento();
  });
});
