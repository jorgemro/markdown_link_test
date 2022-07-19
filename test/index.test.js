const pegaArquivo = require('../src/index.js');


test('teste se é uma função', () => {
    expect(typeof pegaArquivo).toBe('function');
})