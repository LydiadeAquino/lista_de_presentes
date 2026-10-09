const url = "https://script.google.com/macros/s/AKfycbwqEKHWjqKzgm894xfr8A-JapLgX9cd39Fokb5yw-eEpZf-7OclQBVD55gHfSA0WeChWA/exec";

let presentes = [];


function mostrarPresentes(listaPresentes){
    const lista = document.getElementById("listaPresentes");
    
    lista.innerHTML = "";

    listaPresentes.forEach(presente => {

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
}

function carregarPresentes(){
    fetch(url)
    .then(resposta => resposta.json())
    .then(dados => {

        const lista = document.getElementById("listaPresentes");

        lista.innerHTML= "";

        presentes = dados.slice(1);
        
        mostrarPresentes(presentes);
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

    if(resultado.length === 0){
        const lista = document.getElementById("listaPresentes");
        lista.innerHTML = `
        <p class= "nao-encontrado">Presente não encontrado. Verifique o presente digitado.</p>
        `;
    }else{
        mostrarPresentes(resultado);
    }
});

carregarPresentes();