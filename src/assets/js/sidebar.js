const sidebar = document.querySelector(".sidebar");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".item");
const subMenus = document.querySelectorAll(".submenu");
const arrows = document.querySelectorAll(".arrow");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    menu.classList.toggle("submenu-active");
    item.classList.toggle("show-submenu");
    subMenus[index].classList.toggle("show");
    arrows[index].classList.toggle("rotate");
    menuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show-submenu");
        subMenus[index2].classList.remove("show");
        arrows[index2].classList.remove("rotate");
      }
    });
  });
});

sidebar.addEventListener("click", (e) => {
  if (!menu.contains(e.target)) {
    menu.classList.remove("submenu-active");
    menuItems.forEach((item) => {
      item.classList.remove("show-submenu");
    });
    subMenus.forEach((submenu) => {
      submenu.classList.remove("show");
    });
    arrows.forEach((arrow) => {
      arrow.classList.remove("rotate");
    });
  }
});

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

// Preenche o submenu da sidebar com as categorias
function preencherSubMenuGastos() {
  var submenuGastos = document.getElementById("submenuGastos");
  submenuGastos.innerHTML = "";

  categorias.categoriasGasto.forEach(function (categoria) {
    var li = document.createElement("li");
    li.classList.add("menu-item");

    var a = document.createElement("a");
    a.setAttribute("data-bs-toggle", "modal");
    a.setAttribute("data-bs-target", "#modalGerenciarCategoriaGasto");

    var icon = document.createElement("i");
    icon.className = categoria.icone;

    a.appendChild(icon);
    a.appendChild(document.createTextNode(" "));
    a.appendChild(document.createTextNode(categoria.nome));
    li.appendChild(a);

    submenuGastos.appendChild(li);
  });
}

preencherSubMenuGastos();
