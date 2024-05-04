$(".dropdown-item").click(function () {
  var icon = $(this).attr("data-icon");
  var text = $(this).text();
  var button = $(this).closest(".dropdown").find(".btn-secondary");
  button.attr("data-icon", icon);
  button.html('<i class="' + icon + '"></i> ' + text);
});

$("#modalCategoria").on("hidden.bs.modal", function () {
  var defaultIcon = "fas fa-dollar-sign";
  var button = $("#iconeCategoria .btn-secondary");
  var defaultText = '<i class="' + defaultIcon + '"></i>';
  button.attr("data-icon", defaultIcon);
  button.html(defaultText);
});