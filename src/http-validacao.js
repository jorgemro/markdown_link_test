const fetch = (...args) => import ('node-fetch').then(({default: fetch}) => fetch(...args));

function manejarErros(erro) {
    throw new Error(erro.message);
}


async function consultarStatusURLs(arryURLs) {
    try {
        const arrayHttpStatus = await Promise.all(arryURLs.map( async url => {
            const res = await fetch(url);
            return `${res.status} - ${res.statusText}`;
        }));

        return arrayHttpStatus;
    } catch (erro) {
        manejarErros(erro);
    }
}


function gerarArrayURLs(arrayLinks) {
    return arrayLinks.map(objetoLink => Object.values(objetoLink).join());
}

async function validaURLs(arraylinks) {
    const urls =  gerarArrayURLs(arraylinks);
    const arrayStatus = await consultarStatusURLs(urls);

    const resultados = arraylinks.map((objeto, indice) => ({ ...objeto, status: arrayStatus[indice]}));
    return resultados;

}

module.exports = validaURLs;