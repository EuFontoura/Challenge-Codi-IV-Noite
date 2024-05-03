// Atualizar gráfico de gastos
function atualizarGraficos(gastos, receitas) {
    const categoriasComGasto = gastos.filter((categoria) =>
        categoria.gastos.some((gasto) => {
            const partesData = gasto.data.split("/");
            const mesGasto = parseInt(partesData[1], 10);
            return mesGasto === mesIndex + 1;
        })
    );
    const categoriasGastosAtualizadas = categoriasComGasto.map((categoria) => ({
        ...categoria,
        gastos: categoria.gastos.filter((gasto) => {
            const partesData = gasto.data.split("/");
            const mesGasto = parseInt(partesData[1], 10);
            return mesGasto === mesIndex + 1;
        }),
    }));

    const ctxG = document.getElementById("chartCategoriasGasto");
    if (!ctxG) return;

    const existingChartG = Chart.getChart(ctxG);
    if (existingChartG) {
        existingChartG.destroy();
    }

    function calcularPercentualGastos() {
        const totalGastos = categoriasGastosAtualizadas?.reduce((acc, categoria) => {
            return (
                acc +
                categoria.gastos.reduce((accGasto, gasto) => accGasto + gasto.valor, 0)
            );
        }, 0);

        const percentuais = categoriasGastosAtualizadas?.map((categoria) => {
            const categoriaTotal = categoria.gastos.reduce(
                (acc, gasto) => acc + gasto.valor,
                0
            );
            return (categoriaTotal / totalGastos) * 100;
        });
        return percentuais;
    }

    const percentuaisGastos = calcularPercentualGastos();
    const labelsG = categoriasGastosAtualizadas?.map((categoria) => categoria.nome);

    const categoriasComReceita = receitas.filter((categoria) =>
        categoria.receitas.some((receita) => {
            const partesData = receita.data.split("/");
            const mesGasto = parseInt(partesData[1], 10);
            return mesGasto === mesIndex + 1;
        })
    );

    const categoriasReceitaAtualizadas = categoriasComReceita.map((categoria) => ({
        ...categoria,
        receitas: categoria.receitas.filter((receita) => {
            const partesData = receita.data.split("/");
            const mesReceita = parseInt(partesData[1], 10);
            return mesReceita === mesIndex + 1;
        }),
    }));

    const ctxR = document.getElementById("chartCategoriasReceita");
    if (!ctxR) return;

    const existingChartR = Chart.getChart(ctxR);
    if (existingChartR) {
        existingChartR.destroy();
    }

    function calcularPercentualReceitas() {
        const totalReceitas = categoriasReceitaAtualizadas?.reduce((acc, categoria) => {
            return (
                acc +
                categoria.receitas.reduce(
                    (accReceita, Receita) => accReceita + Receita.valor,
                    0
                )
            );
        }, 0);

        const percentuais = categoriasReceitaAtualizadas?.map((categoria) => {
            const categoriaTotal = categoria.receitas.reduce(
                (acc, Receita) => acc + Receita.valor,
                0
            );
            return (categoriaTotal / totalReceitas) * 100;
        });

        return percentuais;
    }

    const percentuaisReceitas = calcularPercentualReceitas();
    const labelsR = categoriasReceitaAtualizadas?.map((categoria) => categoria.nome);

    new Chart(ctxG, {
        type: "doughnut",
        data: {
            labels: labelsG,
            datasets: [
                {
                    label: "% de Gastos",
                    data: percentuaisGastos,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    new Chart(ctxR, {
        type: "doughnut",
        data: {
            labels: labelsR,
            datasets: [
                {
                    label: "% de Receita",
                    data: percentuaisReceitas,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// gráfico planejamento


