
import pegaPokemon from './catchPokemon.js'
import numeroAleatorio from './sortearNumero.js'

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "pt-br";

const box = document.getElementById('box');
const botaoComecar = document.getElementById('newPokemon');
const botaoTentar = document.getElementById('tryAgain');
const resultado = document.getElementById('resultado');
const nomeDoPokemon = document.getElementById('nome-do-pokemon');
const mensagem = document.getElementById('mensagem-jogador');
const formPokemon = document.getElementById('form-pokemon');
let pokemon = {};

async function esperaPokemon() {

    pokemon = await pegaPokemon(numeroAleatorio());

    box.style.backgroundImage = `url(${pokemon.imagem})`;

    speechToText(pokemon);

}

function speechToText(pokemon) {

    nomeDoPokemon.textContent = "";

    recognition.start(); 

    recognition.onresult = (e) => {

        const texto = e.results[0][0].transcript;

        nomeDoPokemon.textContent = `Você disse: ${texto}?`;

        jogo(texto, pokemon.nome);
    };

    recognition.onerror = (e) =>{

        resultado.textContent = 'você não falou!'
        mensagem.textContent = "Tente outra vez ou digite sua resposta!"
        formPokemon.style.display = "flex"
        botaoTentar.disabled = false;
    };
    
};


function jogo (first, second){

    if (first.toLowerCase() === second.toLowerCase()) {
        resultado.textContent = 'você venceu!'
        mensagem.textContent = "Você é um grande treinador"
        botaoTentar.disabled = true;
        formPokemon.style.display = "none"
    } else {
        resultado.textContent = 'você perdeu!'
        mensagem.textContent = "Tente outra vez ou digite sua resposta!"
        formPokemon.style.display = "flex"
        botaoTentar.disabled = false;
    }
}


botaoComecar.addEventListener('click', () => {

    mensagem.textContent = "";
    resultado.textContent = "";

    esperaPokemon();

})

botaoTentar.addEventListener("click", () => {

    mensagem.textContent = "";
    resultado.textContent = "";

    speechToText(pokemon);

})

formPokemon.addEventListener("submit", (event) =>{
    event.preventDefault();

    const nomeDoPokemon = event.target.elements["input-nome"].value;

    jogo(nomeDoPokemon, pokemon.nome);

})