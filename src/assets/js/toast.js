// Toast
function exibirToast(texto, corFundo) {
  Toastify({
    text: texto,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: { background: corFundo },
    onClick: function () {},
  }).showToast();
}
