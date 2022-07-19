const chalk = require('chalk');
const pegaArquivo =  require('./index.js');
const validaURLs = require('./http-validacao.js');

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