/**
 * Exercício 2: Uso de Classe com Atributos, Construtor e Métodos
 * 
 * Classe que representa um Aluno na DevTech Academy.
 */
class Aluno {
  /**
   * Construtor para inicializar os dados do aluno.
   * @param {string} nome - Nome do aluno
   * @param {number|string} idade - Idade do aluno
   * @param {string} curso - Curso matriculado (JavaScript, Python ou Java)
   * @param {number|string} notaFinal - Nota final do aluno (0 a 10)
   */
  constructor(nome, idade, curso, notaFinal) {
    this.nome = typeof nome === 'string' ? nome.trim() : String(nome || '');
    this.idade = Number(idade);
    this.curso = curso;
    this.notaFinal = Number(notaFinal);
  }

  /**
   * Retorna true se a notaFinal for maior ou igual a 7, caso contrário false.
   * @returns {boolean}
   */
  isAprovado() {
    return this.notaFinal >= 7;
  }

  /**
   * Retorna os dados do aluno formatados como texto.
   * @returns {string}
   */
  toString() {
    const situacao = this.isAprovado() ? 'Aprovado' : 'Reprovado';
    return `Nome: ${this.nome} | Idade: ${this.idade} anos | Curso: ${this.curso} | Nota Final: ${this.notaFinal.toFixed(1)} | Situação: ${situacao}`;
  }
}

// Exportação universal para permitir testes no Node.js e uso no navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Aluno;
}
