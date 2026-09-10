// Contador Multi-Datas

const formatarDigito = (digito) => `0${digito}`.slice(-2);

// Agora a função aceita o sufixo numérico correspondente ao dia do evento (1, 2 ou 3)
const atualizar = (tempo, sufixo) => {
    const segundos = document.getElementById(`segundos${sufixo}`);
    const minutos = document.getElementById(`minutos${sufixo}`);
    const horas = document.getElementById(`horas${sufixo}`);
    const dias = document.getElementById(`dias${sufixo}`);

    if (!segundos || !minutos || !horas || !dias) return;

    const qtdSegundos = tempo % 60;
    const qtdMinutos = Math.floor((tempo % (60 * 60)) / 60);
    const qtdHoras = Math.floor((tempo % (60 * 60 * 24)) / (60 * 60));
    const qtdDias = Math.floor(tempo / (60 * 60 * 24));

    segundos.textContent = formatarDigito(qtdSegundos);
    minutos.textContent = formatarDigito(qtdMinutos);
    horas.textContent = formatarDigito(qtdHoras);
    dias.textContent = formatarDigito(qtdDias);
};

const contagemRegressiva = (tempo, sufixo) => {
    const pararContagem = () => clearInterval(id);

    const contar = () => {
        if (tempo <= 0) {
            atualizar(0, sufixo);
            pararContagem();
            return;
        }

        atualizar(tempo, sufixo);
        tempo--;
    };

    const id = setInterval(contar, 1000);
};

// Calcula o tempo baseado em uma string de data específica
const tempoRestante = (dataAlvo) => {
    const dataEvento = new Date(dataAlvo);
    const hoje = Date.now();
    return Math.floor((dataEvento - hoje) / 1000);
};

// Inicialização dos 3 contadores com datas seguidas de forma dinâmica
const iniciarContadores = () => {
    // Defina aqui a data base real do Dia 1
    const dataBaseStr = '2026-09-16 09:00:00'; 
    
    // Converte a base para objetos de data para calcular os dias seguintes com precisão matemática
    const dataDia1 = new Date(dataBaseStr);
    
    const dataDia2 = new Date(dataDia1);
    dataDia2.setDate(dataDia1.getDate() + 1); // 
    
    const dataDia3 = new Date(dataDia1);
    dataDia3.setDate(dataDia1.getDate() + 2)

    
    if (document.getElementById('dias1')) {
        contagemRegressiva(tempoRestante(dataDia1), '1');
    }
    if (document.getElementById('dias2')) {
        contagemRegressiva(tempoRestante(dataDia2), '2');
    }
    if (document.getElementById('dias3')) {
        contagemRegressiva(tempoRestante(dataDia3), '3');
    }
};


iniciarContadores();
