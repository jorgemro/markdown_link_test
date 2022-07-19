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

    return arrayLinks.length === 0 ? 'Não há links' : arrayLinks;
}

function tratarErro(erro) {
   throw new Error(`${erro.code}, não há arquivo no caminho.`);
}

async function pegarTextoArquivo(caminhoArquivo) {
    const encoding = "utf-8";

    try 
    {
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);
        return extrairLinks(texto);
    } catch(erro) {
        tratarErro(erro);
    }
}

module.exports = pegarTextoArquivo;