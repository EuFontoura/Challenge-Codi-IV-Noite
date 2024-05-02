function saldoMensal() {
    let totalGastos = 0;
    let totalReceitas = 0;

    categorias.categoriasGasto.forEach((categoria) => {
        categoria.gastos.forEach((gasto) => {
            const partesData = gasto.data.split("/");
            const mesGasto = parseInt(partesData[1], 10);
            if (mesGasto === mesIndex + 1) {
                totalGastos += gasto.valor;
            }
        });
    });

    categorias.categoriasReceita.forEach((categoria) => {
        categoria.receitas.forEach((receita) => {
            const partesData = receita.data.split("/");
            const mesReceita = parseInt(partesData[1], 10);
            if (mesReceita === mesIndex + 1) {
                totalReceitas += receita.valor;
            }
        });
    });

    var saldoTotal = totalReceitas - totalGastos;

    const spanSaldo = document.getElementById('saldo');
    spanSaldo.textContent = `R$ ${saldoTotal.toFixed(2)}`
}

saldoMensal();