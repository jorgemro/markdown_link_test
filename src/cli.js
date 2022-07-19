const chalk = require('chalk');
const pegaArquivo =  require('./index.js');
const validaURLs = require('./http-validacao.js');

const entrada = process.argv;

async function processaEntrada(caminhoArquivo) {
    
    const arrayLinks = await pegaArquivo(caminhoArquivo[2]);

    if (caminhoArquivo[3] == "validar") {
         console.log( await validaURLs(arrayLinks));
    } else {
        console.log(chalk.yellow("links do arquivo: "), arrayLinks);
    }  
}

processaEntrada(entrada);