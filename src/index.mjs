import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const __filename = fileURLToPath(import.meta.url);
    const __dirname =  path.dirname(__filename);

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
        // const texto = await fs.promises.readFile(caminhoArquivo, encode);
        // const links = extrairLinks(texto);
        // return links;
    } catch(erro) {
        tratarErro(erro);
    }
}

export default pegarTextoArquivo;