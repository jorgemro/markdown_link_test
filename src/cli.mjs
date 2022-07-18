import chalk from 'chalk';
import pegaArquivo from './index.mjs';
import validaURLs from './http-validacao.mjs';

const entrada = process.argv;

async function processaEntrada(caminhoArquivo) {
    
    const arrayLinksArquivos = await pegaArquivo(caminhoArquivo[2]);

    if (caminhoArquivo[3] == "validar") {
        arrayLinksArquivos.map(async links => console.log( await validaURLs(links)));
    } else {
        console.log(chalk.yellow("links do arquivo: "), arrayLinksArquivos);
    }  
}

processaEntrada(entrada);