import fs from 'fs';
import chalk from 'chalk';

function extrairLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayLinks = new Array();
    let temp = "";

    while ((temp = regex.exec(texto)) != null)
    {
        arrayLinks.push({[temp[1]]: temp[2]});
    }

    return arrayLinks;
}

function tratarErro(erro) {
    console.log(chalk.red(erro.code, "Erro ao recuperar o arquivo."));
}

async function pegarTextoArquivo(caminhoArquivo) {
    try {
        const encode = "utf-8";
        const texto = await fs.promises.readFile(caminhoArquivo, encode);
        const links = extrairLinks(texto);
        console.log(links);
    } catch(erro) {
        tratarErro(erro);    
    } finally {
        console.log(chalk.yellow("operação concluida."));
    }
}

pegarTextoArquivo("./arquivos/arquivo.md");