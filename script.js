const url = "https://script.google.com/macros/s/AKfycbwqEKHWjqKzgm894xfr8A-JapLgX9cd39Fokb5yw-eEpZf-7OclQBVD55gHfSA0WeChWA/exec";

let presentes = [];
function carregarPresentes(){
    fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {

        const lista = document.getElementById("listaPresentes");

        lista.innerHTML= "";

        presentes = dados.slice(1);
        presentes.forEach(presente => {
    //slice(1) quer dizer "pegue uma cópia do array começando pelo índice 1", ou seja,
    //o primeiro índice[0] é o cabeçalho que tem a informação da coluna(ex:id,nome,status e convidado), não foi chamado.
    //obs: o slice não pega o primeiro elemento do array, ele pega o array inteiro da posição 1 e outros arrays seguintes.
    //para cada linha que tem na planilha, é um array.
            const id = presente[0];
            const nome = presente[1];
            const status = presente[2];
            const convidado = presente[3];

            const card = document.createElement("div");
            card.classList.add("card-presente");

            if(status === "Disponível"){
                card.innerHTML = `
                    <h3>${nome}</h3>
                    <p>🟢DISPONÍVEL</p>
                    <button>🎁Escolher este presente</button>

                `;
                const botao = card.querySelector("button");
                
                botao.addEventListener("click", () => {

                    botao.style.display = "none";

                    const campoNome = document.createElement("input");
                    campoNome.placeholder = "Digite seu nome:";

                    const botaoConfirmar = document.createElement("button");
                    botaoConfirmar.textContent = "🎁Confirmar presente";

                    card.appendChild(campoNome);
                    card.appendChild(botaoConfirmar);

                    botaoConfirmar.addEventListener("click", () =>{
                        const nomeConvidado = campoNome.value;
                                        

                        fetch(url, {
                            method: "POST",
                            mode: "no-cors",
                            body:JSON.stringify({
                                id: id,
                                nome: nomeConvidado
                            })
                        })
                        .then( () => {
                            console.log("Dados enviados.");
                            carregarPresentes();
                        });
                    });

                });

            } else{
                card.innerHTML = `
                    <h3>${nome}</h3>
                    <p>🔴INDISPONÍVEL</p>
                    <p>Convidado: ${convidado}</p>

                `;
            }

            lista.appendChild(card);    

        });
    });
}

const pesquisa = document.getElementById("pesquisaPresente");

pesquisa.addEventListener("input", () => {

    const textoDigitado = pesquisa.value;
    /*a função .filter() pega uma lista e cria uma nova lista que corresponde a condição que ela propõe.*/
    const resultado = presentes.filter(presente => {

        const nome = presente[1];
    /*a função .includes() é uma pergunta para certo objeto que está usando e a pergunta é "Contém?"
    se sim true e se não false. toLowerCse é uma função que mantém a string minúscula porque qualquer diferença
    pode resultar em false */
    return nome.toLowerCase().includes(textoDigitado.toLowerCase());
    });
    console.log(resultado);
});

carregarPresentes();