const pegaArquivo = require('../src/index.js');

describe("pegaArquivo::", () => {
    const arrayResult = [
        {
            FileList:"https://developer.mozilla.org/pt-BR/docs/Web/API/FileList"
        }
    ]

    it("deve ser uma função", () => {
        expect(typeof pegaArquivo).toBe('function');
    });
    it("deve retornar um array de resultados", async () => {
        const resultado = await pegaArquivo("/Users/jorgemalta/projects/nodejs/markdown_lib/test/arquivos/arquivo.md");
        expect(resultado).toEqual(arrayResult);
    });
    it ("deve para arquivos sem links, retornar o texto 'Não há links''", async () => {
        const resultado = await pegaArquivo("/Users/jorgemalta/projects/nodejs/markdown_lib/test/arquivos/arquivo_sem_links.md");
        expect(resultado).toBe("Não há links");
    });
    it ("Deve lançar um erro na falta de arquivo", async () => {
        await expect(pegaArquivo("/Users/jorgemalta/projects/nodejs/markdown_lib/test/arquivos"))
            .rejects
            .toThrow(/não há arquivo no caminho/);
    });
    it ("deve resolver a função com sucesso", async () => {
        await expect(pegaArquivo("/Users/jorgemalta/projects/nodejs/markdown_lib/test/arquivos/arquivo.md"))
            .resolves
            .toEqual(arrayResult);
    });
});

