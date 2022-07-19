const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

function extrairLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayLinks = [];
    
    let temp = "";
    while ((temp = regex.exec(texto)) != null)
    {
        arrayLinks.push({[temp[1]]: temp[2]});
    }

    return arrayLinks.length === 0 ? 'Não há links.' : arrayLinks;
}

function tratarErro(erro) {
    console.log(chalk.red(erro.code, "Erro ao recuperar o arquivo."));
}

async function pegarTextoArquivo(caminhoArquivo) {
    const caminhoAbsoluto = path.join(__dirname, '..', caminhoArquivo);
    const encoding = "utf-8";

    try {
        const arquivos = await fs.promises.readdir(caminhoAbsoluto,{ encoding });
        const resultados = Promise.all(arquivos.map(async (arquivo) => {
            const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
            const texto = await fs.promises.readFile(localArquivo, encoding)
            return extrairLinks(texto);
        }));
        
        return resultados;
    } catch(erro) {
        tratarErro(erro);
    }
}

module.exports = pegarTextoArquivo;