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
    a.setAttribute("data-bs-toggle", "modal");

    var icon = document.createElement("i");
    icon.className = categoria.icone;

    a.appendChild(icon);
    a.appendChild(document.createTextNode(" "));
    a.appendChild(document.createTextNode(categoria.nome));
    li.appendChild(a);

    submenuReceitas.appendChild(li);
  });
  preencherSelectCategorias();
}

// Preenche o submenu da sidebar com as categorias
function preencherSubMenuGastos() {
  var submenuGastos = document.getElementById("submenuGastos");
  submenuGastos.innerHTML = "";

  categorias.categoriasGasto.forEach(function (categoria) {
    var li = document.createElement("li");
    li.classList.add("menu-item");

    var a = document.createElement("a");
    a.setAttribute("data-bs-toggle", "modal");

    var icon = document.createElement("i");
    icon.className = categoria.icone;

    a.appendChild(icon);
    a.appendChild(document.createTextNode(" "));
    a.appendChild(document.createTextNode(categoria.nome));
    li.appendChild(a);

    submenuGastos.appendChild(li);
  });
  preencherSelectCategorias();
}

// Preenche o submenu da sidebar com as categorias
function preencherSubMenuPlanejamentos() {
  var submenuPlanejamentos = document.getElementById("submenuPlanejamentos");
  submenuPlanejamentos.innerHTML = "";

  planejamentos.forEach(function (planejamento) {
    var li = document.createElement("li");
    li.classList.add("menu-item");

    var a = document.createElement("a");
    a.setAttribute("onclick", `exibirPlanejamento("${planejamento.id}")`);

    var icon = document.createElement("i");
    icon.className = planejamento.icone;

    a.appendChild(icon);
    a.appendChild(document.createTextNode(" "));
    a.appendChild(document.createTextNode(planejamento.nome));
    li.appendChild(a);

    submenuPlanejamentos.appendChild(li);
  });
}
