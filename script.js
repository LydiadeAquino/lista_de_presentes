const url = "https://script.google.com/macros/s/AKfycbwqEKHWjqKzgm894xfr8A-JapLgX9cd39Fokb5yw-eEpZf-7OclQBVD55gHfSA0WeChWA/exec";

fetch(url)
.then(resposta => resposta.json())
.then(dados => {
    const lista = document.getElementById("listaPresentes");
    dados.slice(1).forEach(presente => {
//slice(1) quer dizer "pegue uma cópia do array começando pelo índice 1", ou seja,
//o primeiro índice[0] é o cabeçalho que tem a informação da coluna(ex:id,nome,status e convidado), não foi chamado.
//obs: o slice não pega o primeiro elemento do array, ele pega o array inteiro da posição 1 e outros arrays seguintes.
//para cada linha que tem na planilha, é um array.
        const id = presente[0];
        const nome = presente[1];
        const status = presente[2];
        const convidado = presente[3];

        
        console.log( id);
        console.log(nome);
        console.log(status);
        console.log(convidado);

    })
})
