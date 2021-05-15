const form = document.querySelector('#form');
const horaAcessado = document.querySelector('#horaAcesso');
console.log(horaAcessado);
let data = new Date();
formatHour(data);

// Capturar evento de submit do formulario e previnir comportamento default
// FUNCAO MAIN que realiza as comparações
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o evento de enviar o formulario e recarregar a pagina, quando enviado realiza o que estiver abaixo no codigo
    const inputPeso = document.querySelector('#peso');
    const inputAltura = document.querySelector('#altura');
    
    // Transforma os valores pegos string em numeros
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // Verifica se o peso é invalido
    if(!peso || peso < 0) {
        setResult('Peso invalido', false);
        return;
    }
    // Verifica se a altura é invalida
    else if (!altura || altura < 0) {
        setResult('Altura invalida', false);
        return;
    }
    // Se caso nao entrar em nenhum ela automaticamente é valida e realiza o calculo de imc, pega o nivel de acordo com o imc e envia a mensagem de resultado
    else {
        const imc = getImc(peso, altura);
        const nivelImc = getNivelImc(imc);
        const resultMessage = `Seu IMC é ${imc} e você tem(está) ${nivelImc}`;
        setResult(resultMessage, true);
    }
});

// FUNCOES AUXILIARES

// Calcula o imc e retorna com uma casa depois da virgula
function getImc(peso, altura) {
    const calculaImc = (peso / (Math.pow(altura, 2)));
    return calculaImc.toFixed(1);
};

// Armazena e retorna o nivel de imc correto
function getNivelImc(imc) {
    const nivel = ['abaixo do peso', 'peso normal', 'sobrepeso', 'obesidade grau 1', 'obesidade grau 2', 'obesidade grau 3']; // Vetor para armazenar os niveis
    // Verifica a mensagem de cada nivel
    if(imc >= 39.9) return nivel[5];
    if(imc >= 34.9) return nivel[4];
    if(imc >= 29.9) return nivel[3];
    if(imc >= 24.9) return nivel[2];
    if(imc >= 18.5) return nivel[1];
    if(imc < 18.5) return nivel[0];
};

// Colocar mensagem de resultado quando feito o calculo
function setResult(message, isValid) {
    const resultado = document.querySelector('.resultado');
    resultado.innerHTML = ''; // Deixa o resultado em branco
    const p = criaParagrafo(); // Chama a funcao de criacao de paragrafo
    if(isValid) {
        resultado.classList.toggle("background-color");
        p.classList.add("paragrafo-resultado-sucesso"); // Se o imc for valido ele cria esta classe para o paragrafo
    }
    else {
        resultado.classList.toggle("background-color");
        p.classList.add("paragrafo-resultado-err"); // Se o imc for invalido ele cria esta classe para o paragrafo
    }
    p.innerHTML = `${message}`; // Coloca a mensagem vinda dentro do paragrafo
    resultado.appendChild(p); // E depoois coloca o paragrafo dentro da div resultado
};

// Funcao para criar paragrafo
function criaParagrafo() {
    const paragrafo = document.createElement(`p`); // Cria o elemento paragrafo deste modo <p></p>
    return paragrafo; // Retorn <p></p>
};

function adicionaZeroNoNum(num) {
    if(num >= 10) {
        return num;
    }
    else {
        return `0${num}`;
    }
};

function formatHour(data) {
    let dia = adicionaZeroNoNum(data.getDate());
    let mes = adicionaZeroNoNum(data.getMonth() + 1);
    let ano = adicionaZeroNoNum(data.getFullYear());
    let horas = adicionaZeroNoNum(data.getHours());
    let minutos = adicionaZeroNoNum(data.getMinutes());
    let segundos = adicionaZeroNoNum(data.getSeconds());
    horaAcessado.classList.add('horaAcesso');
    horaAcessado.innerHTML = (`Está página foi acessada no dia ${dia}/${mes}/${ano} às ${horas}:${minutos}:${segundos}`);
};