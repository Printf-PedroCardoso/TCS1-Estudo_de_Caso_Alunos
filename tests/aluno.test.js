const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const Aluno = require('../js/Aluno.js');

describe('Exercício 2 - Classe Aluno', () => {
  test('deve inicializar atributos corretamente no construtor', () => {
    const aluno = new Aluno('Ana Clara', 22, 'JavaScript', 8.5);

    assert.equal(aluno.nome, 'Ana Clara');
    assert.equal(aluno.idade, 22);
    assert.equal(aluno.curso, 'JavaScript');
    assert.equal(aluno.notaFinal, 8.5);
  });

  test('isAprovado() deve retornar true se notaFinal >= 7', () => {
    const alunoAprovado1 = new Aluno('Carlos', 20, 'Python', 7.0);
    const alunoAprovado2 = new Aluno('Beatriz', 25, 'Java', 9.5);

    assert.equal(alunoAprovado1.isAprovado(), true);
    assert.equal(alunoAprovado2.isAprovado(), true);
  });

  test('isAprovado() deve retornar false se notaFinal < 7', () => {
    const alunoReprovado = new Aluno('Daniel', 19, 'JavaScript', 6.9);

    assert.equal(alunoReprovado.isAprovado(), false);
  });

  test('toString() deve retornar dados formatados do aluno', () => {
    const aluno = new Aluno('Mariana', 24, 'Python', 8.0);
    const texto = aluno.toString();

    assert.match(texto, /Mariana/);
    assert.match(texto, /24 anos/);
    assert.match(texto, /Python/);
    assert.match(texto, /8\.0/);
    assert.match(texto, /Aprovado/);
  });
});

describe('Exercício 4 - Manipulação de Arrays (filter, map, reduce, sort)', () => {
  const listaAlunos = [
    new Aluno('Carlos Silva', 28, 'Python', 6.5),
    new Aluno('Beatriz Santos', 22, 'JavaScript', 9.0),
    new Aluno('Ana Oliveira', 25, 'Java', 7.5),
    new Aluno('Eduardo Lima', 30, 'Python', 5.0),
    new Aluno('Daniel Costa', 20, 'JavaScript', 8.0)
  ];

  test('filter: deve listar apenas alunos aprovados (notaFinal >= 7)', () => {
    const aprovados = listaAlunos.filter(aluno => aluno.isAprovado());

    assert.equal(aprovados.length, 3);
    assert.deepEqual(aprovados.map(a => a.nome), ['Beatriz Santos', 'Ana Oliveira', 'Daniel Costa']);
  });

  test('reduce: deve calcular a média das notas finais', () => {
    const somaNotas = listaAlunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
    const mediaNotas = somaNotas / listaAlunos.length;

    // (6.5 + 9.0 + 7.5 + 5.0 + 8.0) / 5 = 36.0 / 5 = 7.2
    assert.equal(mediaNotas, 7.2);
  });

  test('reduce: deve calcular a média das idades', () => {
    const somaIdades = listaAlunos.reduce((acc, aluno) => acc + aluno.idade, 0);
    const mediaIdades = somaIdades / listaAlunos.length;

    // (28 + 22 + 25 + 30 + 20) / 5 = 125 / 5 = 25
    assert.equal(mediaIdades, 25);
  });

  test('sort & map: deve listar os nomes em ordem alfabética sem alterar o array original', () => {
    const nomesOrdenados = [...listaAlunos]
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map(aluno => aluno.nome);

    assert.deepEqual(nomesOrdenados, [
      'Ana Oliveira',
      'Beatriz Santos',
      'Carlos Silva',
      'Daniel Costa',
      'Eduardo Lima'
    ]);
    // Garantir que a lista original não teve sua ordem mutada
    assert.equal(listaAlunos[0].nome, 'Carlos Silva');
  });

  test('reduce: deve contar a quantidade de alunos por curso', () => {
    const porCurso = listaAlunos.reduce((acc, aluno) => {
      acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
      return acc;
    }, {});

    assert.deepEqual(porCurso, {
      Python: 2,
      JavaScript: 2,
      Java: 1
    });
  });
});
