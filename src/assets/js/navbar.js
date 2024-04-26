const botao = document.querySelector(".toggleButton");
const main = document.querySelector(".main");

function toggleSidebar() {
  const isSidebarHidden = sidebar.classList.contains("hidden");
  sidebar.classList.toggle("hidden");
  main.classList.toggle("hidden", isSidebarHidden);
}

botao.addEventListener("click", toggleSidebar);

function updateVisibility() {
  const isSidebarHidden = sidebar.classList.contains("hidden");
  main.classList.toggle("hidden", isSidebarHidden);
}

// Adicione um ouvinte de evento de redimensionamento da janela
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("hidden");
    updateVisibility();
  } else {
    sidebar.classList.add("hidden");
    main.classList.remove("hidden");
  }
});
