/**
 * DevTech Academy - Gerenciamento de Alunos
 * 
 * Este arquivo implementa os requisitos dos Exercícios 1, 3 e 4:
 * - Exercício 1: CRUD de alunos com manipulação de DOM e array em memória
 * - Exercício 3: addEventListener, funções anônimas nos cliques, arrow functions na manipulação de dados, alert e console.log
 * - Exercício 4: Relatórios utilizando filter, map, reduce, sort e forEach
 */

// Array em memória para armazenar as instâncias da classe Aluno (Exercício 1 e 2)
let alunos = [];

// Variável de controle para o modo de edição: null = novo cadastro; number = índice do aluno em edição
let indiceEdicao = null;

// Elementos do DOM
const formAluno = document.getElementById('form-aluno');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const selectCurso = document.getElementById('curso');
const inputNotaFinal = document.getElementById('notaFinal');
const btnCadastrar = document.getElementById('btn-cadastrar');
const btnCancelarEdicao = document.getElementById('btn-cancelar-edicao');
const corpoTabela = document.getElementById('tabela-corpo');
const painelRelatorio = document.getElementById('painel-relatorio');

// Botões da seção de Relatórios (Exercício 4)
const btnRelatorioAprovados = document.getElementById('btn-relatorio-aprovados');
const btnRelatorioMediaNotas = document.getElementById('btn-relatorio-media-notas');
const btnRelatorioMediaIdades = document.getElementById('btn-relatorio-media-idades');
const btnRelatorioNomesOrdem = document.getElementById('btn-relatorio-nomes-ordem');
const btnRelatorioQtdCurso = document.getElementById('btn-relatorio-qtd-curso');
const btnRelatorioTodos = document.getElementById('btn-relatorio-todos');
const btnCargaExemplo = document.getElementById('btn-carga-exemplo');
const btnLimparTodos = document.getElementById('btn-limpar-todos');

/**
 * Função para renderizar os registros de alunos na tabela HTML (Exercício 1).
 * Utiliza o método forEach com arrow function para iterar sobre os dados (Exercício 3 e 4).
 * Adiciona escutadores com addEventListener e funções anônimas para cada botão (Exercício 3).
 */
function renderizarTabela() {
  corpoTabela.innerHTML = '';

  if (alunos.length === 0) {
    const linhaVazia = document.createElement('tr');
    linhaVazia.innerHTML = `
      <td colspan="7" style="text-align: center; color: #666; padding: 12px;">
        Nenhum aluno cadastrado no momento.
      </td>
    `;
    corpoTabela.appendChild(linhaVazia);
    return;
  }

  // Uso de forEach com arrow function (Exercício 3 e 4)
  alunos.forEach((aluno, index) => {
    const linha = document.createElement('tr');

    // Destaca visualmente se o aluno está em edição
    if (indiceEdicao === index) {
      linha.className = 'linha-editando';
    }

    const situacaoTexto = aluno.isAprovado() ? 'Aprovado' : 'Reprovado';
    const situacaoClasse = aluno.isAprovado() ? 'status-aprovado' : 'status-reprovado';

    linha.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${aluno.nome}</strong></td>
      <td>${aluno.idade}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.notaFinal.toFixed(1)}</td>
      <td><span class="badge ${situacaoClasse}">${situacaoTexto}</span></td>
      <td class="coluna-acoes"></td>
    `;

    const colunaAcoes = linha.querySelector('.coluna-acoes');

    // Botão de Editar com addEventListener e FUNÇÃO ANÔNIMA (Exercício 3)
    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-acao btn-editar';
    btnEditar.addEventListener('click', function () {
      iniciarEdicao(index);
    });

    // Botão de Excluir com addEventListener e FUNÇÃO ANÔNIMA (Exercício 3)
    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'btn-acao btn-excluir';
    btnExcluir.addEventListener('click', function () {
      excluirAluno(index);
    });

    colunaAcoes.appendChild(btnEditar);
    colunaAcoes.appendChild(btnExcluir);

    corpoTabela.appendChild(linha);
  });
}

/**
 * Salva um novo aluno ou atualiza um aluno existente (CRUD - Exercício 1 e 2).
 * Exibe mensagens informativas via alert() e console.log() (Exercício 3).
 */
function salvarAluno() {
  const nome = inputNome.value.trim();
  const idade = parseFloat(inputIdade.value);
  const curso = selectCurso.value;
  const notaFinal = parseFloat(inputNotaFinal.value);

  // Validação simples dos dados
  if (!nome || isNaN(idade) || !curso || isNaN(notaFinal)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  if (idade <= 0 || idade > 120) {
    alert('Por favor, informe uma idade válida (entre 1 e 120 anos).');
    return;
  }

  if (notaFinal < 0 || notaFinal > 10) {
    alert('A nota final deve estar entre 0 e 10.');
    return;
  }

  // Criação da instância da classe Aluno (Exercício 2)
  const novoAluno = new Aluno(nome, idade, curso, notaFinal);

  if (indiceEdicao === null) {
    // Modo Cadastro: adiciona o novo aluno ao array em memória
    alunos.push(novoAluno);

    // Mensagens via console.log() e alert() (Exercício 3)
    console.log('[SALVAR - CADASTRO] Novo aluno adicionado:', novoAluno.toString());
    alert(`Aluno "${novoAluno.nome}" cadastrado com sucesso!`);
  } else {
    // Modo Edição: substitui os dados do aluno no índice selecionado
    const alunoAnterior = alunos[indiceEdicao];
    alunos[indiceEdicao] = novoAluno;

    // Mensagens via console.log() e alert() (Exercício 3)
    console.log(`[SALVAR - EDIÇÃO] Aluno no índice ${indiceEdicao} atualizado de [${alunoAnterior.toString()}] para [${novoAluno.toString()}]`);
    alert(`Dados do aluno "${novoAluno.nome}" atualizados com sucesso!`);

    cancelarEdicao(false); // Reseta modo de edição sem alert extra
  }

  limparFormulario();
  renderizarTabela();
}

/**
 * Carrega os dados de um aluno no formulário para edição (Exercício 1).
 * Exibe mensagens via console.log() e alert() (Exercício 3).
 * @param {number} index - Índice do aluno no array
 */
function iniciarEdicao(index) {
  const aluno = alunos[index];
  if (!aluno) return;

  indiceEdicao = index;
  inputNome.value = aluno.nome;
  inputIdade.value = aluno.idade;
  selectCurso.value = aluno.curso;
  inputNotaFinal.value = aluno.notaFinal;

  btnCadastrar.textContent = 'Salvar Alterações';
  btnCancelarEdicao.style.display = 'inline-block';
  inputNome.focus();

  // Mensagens via console.log() e alert() ao editar (Exercício 3)
  console.log(`[EDITAR] Iniciando edição do aluno no índice ${index}:`, aluno.toString());
  alert(`Editando os dados de: "${aluno.nome}". Altere os campos desejados e clique em "Salvar Alterações".`);

  renderizarTabela();
}

/**
 * Cancela o modo de edição e restaura o formulário para cadastro.
 * @param {boolean} emitirAviso - Se true, exibe log/aviso de cancelamento
 */
function cancelarEdicao(emitirAviso = true) {
  indiceEdicao = null;
  btnCadastrar.textContent = 'Cadastrar';
  btnCancelarEdicao.style.display = 'none';
  limparFormulario();
  renderizarTabela();

  if (emitirAviso) {
    console.log('[EDIÇÃO CANCELADA] O usuário cancelou a edição.');
  }
}

/**
 * Remove um aluno do array em memória (CRUD - Exercício 1).
 * Exibe mensagens via console.log() e alert() (Exercício 3).
 * @param {number} index - Índice do aluno a excluir
 */
function excluirAluno(index) {
  const aluno = alunos[index];
  if (!aluno) return;

  const confirmou = confirm(`Deseja realmente excluir o aluno "${aluno.nome}"?`);
  if (!confirmou) {
    console.log(`[EXCLUIR CANCELADO] Exclusão de "${aluno.nome}" cancelada pelo usuário.`);
    return;
  }

  // Remove o elemento do array
  const alunoRemovido = alunos.splice(index, 1)[0];

  // Se estava editando o aluno excluído, cancela edição
  if (indiceEdicao === index) {
    cancelarEdicao(false);
  } else if (indiceEdicao !== null && indiceEdicao > index) {
    indiceEdicao--;
  }

  // Mensagens via console.log() e alert() ao excluir (Exercício 3)
  console.log('[EXCLUIR] Aluno removido com sucesso:', alunoRemovido.toString());
  alert(`Aluno "${alunoRemovido.nome}" excluído com sucesso!`);

  renderizarTabela();
}

/**
 * Limpa os campos do formulário HTML.
 */
function limparFormulario() {
  inputNome.value = '';
  inputIdade.value = '';
  selectCurso.selectedIndex = 0;
  inputNotaFinal.value = '';
}

/* ==========================================================================
   Exercício 4: Relatórios com filter, map, reduce, sort e forEach
   ========================================================================== */

/**
 * 1. Listar alunos aprovados (notaFinal >= 7) usando filter (Exercício 4).
 */
function relatorioAlunosAprovados() {
  if (alunos.length === 0) {
    exibirResultadoRelatorio('Alunos Aprovados (filter)', '<p>Não há alunos cadastrados para gerar o relatório.</p>');
    return;
  }

  // Uso de filter com arrow function (Exercício 3 e 4)
  const aprovados = alunos.filter(aluno => aluno.isAprovado());

  let html = `
    <h4>1. Lista de Alunos Aprovados (Nota Final &ge; 7.0)</h4>
    <p><strong>Método utilizado:</strong> <code>Array.prototype.filter()</code></p>
    <p>Total de aprovados: <strong>${aprovados.length}</strong> de <strong>${alunos.length}</strong> alunos (${((aprovados.length / alunos.length) * 100).toFixed(1)}%).</p>
  `;

  if (aprovados.length === 0) {
    html += '<p>Nenhum aluno atingiu a nota mínima de aprovação (7.0).</p>';
  } else {
    html += '<ul>';
    // Uso de forEach com arrow function para exibição
    aprovados.forEach(aluno => {
      html += `<li><strong>${aluno.nome}</strong> - Curso: ${aluno.curso} | Nota: ${aluno.notaFinal.toFixed(1)}</li>`;
    });
    html += '</ul>';
  }

  exibirResultadoRelatorio('Alunos Aprovados', html);
  console.log('[RELATÓRIO - APROVADOS]', aprovados.map(a => a.toString()));
}

/**
 * 2. Calcular e exibir a média das notas finais usando reduce (Exercício 4).
 */
function relatorioMediaNotas() {
  if (alunos.length === 0) {
    exibirResultadoRelatorio('Média das Notas Finais (reduce)', '<p>Não há alunos cadastrados para calcular a média.</p>');
    return;
  }

  // Uso de reduce com arrow function (Exercício 3 e 4)
  const somaNotas = alunos.reduce((acumulador, aluno) => acumulador + aluno.notaFinal, 0);
  const mediaNotas = somaNotas / alunos.length;

  const html = `
    <h4>2. Média Geral das Notas Finais</h4>
    <p><strong>Método utilizado:</strong> <code>Array.prototype.reduce()</code></p>
    <div class="destaque-metrica">
      <span class="metrica-valor">${mediaNotas.toFixed(2)}</span>
      <span class="metrica-rotulo">Soma total das notas: ${somaNotas.toFixed(2)} | Total de avaliações: ${alunos.length}</span>
    </div>
  `;

  exibirResultadoRelatorio('Média das Notas Finais', html);
  console.log(`[RELATÓRIO - MÉDIA DE NOTAS] Média: ${mediaNotas.toFixed(2)} (Total alunos: ${alunos.length})`);
}

/**
 * 3. Calcular e exibir a média das idades usando reduce (Exercício 4).
 */
function relatorioMediaIdades() {
  if (alunos.length === 0) {
    exibirResultadoRelatorio('Média das Idades (reduce)', '<p>Não há alunos cadastrados para calcular a média de idades.</p>');
    return;
  }

  // Uso de reduce com arrow function (Exercício 3 e 4)
  const somaIdades = alunos.reduce((acumulador, aluno) => acumulador + aluno.idade, 0);
  const mediaIdades = somaIdades / alunos.length;

  const html = `
    <h4>3. Média das Idades dos Alunos</h4>
    <p><strong>Método utilizado:</strong> <code>Array.prototype.reduce()</code></p>
    <div class="destaque-metrica">
      <span class="metrica-valor">${mediaIdades.toFixed(1)} anos</span>
      <span class="metrica-rotulo">Soma das idades: ${somaIdades} | Total de alunos: ${alunos.length}</span>
    </div>
  `;

  exibirResultadoRelatorio('Média das Idades', html);
  console.log(`[RELATÓRIO - MÉDIA DE IDADES] Média: ${mediaIdades.toFixed(1)} anos`);
}

/**
 * 4. Listar os nomes dos alunos em ordem alfabética usando sort e map (Exercício 4).
 */
function relatorioNomesOrdemAlfabetica() {
  if (alunos.length === 0) {
    exibirResultadoRelatorio('Nomes em Ordem Alfabética (sort & map)', '<p>Não há alunos cadastrados para ordenar.</p>');
    return;
  }

  // Uso de sort e map com arrow functions sobre cópia do array (Exercício 3 e 4)
  const nomesOrdenados = [...alunos]
    .sort((alunoA, alunoB) => alunoA.nome.localeCompare(alunoB.nome, 'pt-BR', { sensitivity: 'base' }))
    .map(aluno => aluno.nome);

  let html = `
    <h4>4. Nomes dos Alunos em Ordem Alfabética (A-Z)</h4>
    <p><strong>Métodos utilizados:</strong> <code>Array.prototype.sort()</code> e <code>Array.prototype.map()</code></p>
    <ol>
  `;

  nomesOrdenados.forEach(nome => {
    html += `<li><strong>${nome}</strong></li>`;
  });

  html += '</ol>';

  exibirResultadoRelatorio('Nomes em Ordem Alfabética', html);
  console.log('[RELATÓRIO - NOMES ORDEM ALFABÉTICA]', nomesOrdenados);
}

/**
 * 5. Mostrar a quantidade de alunos por curso usando reduce (Exercício 4).
 */
function relatorioQuantidadePorCurso() {
  if (alunos.length === 0) {
    exibirResultadoRelatorio('Quantidade por Curso (reduce)', '<p>Não há alunos cadastrados para agrupar por curso.</p>');
    return;
  }

  // Cursos pré-definidos do sistema
  const cursosDisponiveis = ['JavaScript', 'Python', 'Java'];

  // Uso de reduce com arrow function (Exercício 3 e 4)
  const contagemInicial = { JavaScript: 0, Python: 0, Java: 0 };
  const contagem = alunos.reduce((acumulador, aluno) => {
    acumulador[aluno.curso] = (acumulador[aluno.curso] || 0) + 1;
    return acumulador;
  }, contagemInicial);

  let html = `
    <h4>5. Quantidade de Alunos Matriculados por Curso</h4>
    <p><strong>Método utilizado:</strong> <code>Array.prototype.reduce()</code></p>
    <table border="1" class="tabela-relatorio">
      <thead>
        <tr>
          <th>Curso</th>
          <th>Quantidade de Alunos</th>
          <th>Proporção</th>
        </tr>
      </thead>
      <tbody>
  `;

  cursosDisponiveis.forEach(curso => {
    const qtd = contagem[curso] || 0;
    const porcentagem = alunos.length > 0 ? ((qtd / alunos.length) * 100).toFixed(1) : 0;
    html += `
      <tr>
        <td><strong>${curso}</strong></td>
        <td>${qtd} aluno(s)</td>
        <td>${porcentagem}%</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  exibirResultadoRelatorio('Quantidade por Curso', html);
  console.log('[RELATÓRIO - QUANTIDADE POR CURSO]', contagem);
}

/**
 * Exibe um relatório completo com todas as 5 métricas combinadas (Exercício 4).
 */
function relatorioTodos() {
  if (alunos.length === 0) {
    exibirResultadoRelatorio('Relatório Completo', '<p>Não há alunos cadastrados para gerar o relatório completo.</p>');
    return;
  }

  // 1. filter
  const aprovados = alunos.filter(a => a.isAprovado());

  // 2. reduce (notas)
  const somaNotas = alunos.reduce((acc, a) => acc + a.notaFinal, 0);
  const mediaNotas = (somaNotas / alunos.length).toFixed(2);

  // 3. reduce (idades)
  const somaIdades = alunos.reduce((acc, a) => acc + a.idade, 0);
  const mediaIdades = (somaIdades / alunos.length).toFixed(1);

  // 4. sort & map (nomes)
  const nomesOrdenados = [...alunos]
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))
    .map(a => a.nome);

  // 5. reduce (cursos)
  const porCurso = alunos.reduce((acc, a) => {
    acc[a.curso] = (acc[a.curso] || 0) + 1;
    return acc;
  }, { JavaScript: 0, Python: 0, Java: 0 });

  const html = `
    <h4>Visão Consolidada de Todos os Relatórios</h4>
    <div class="resumo-grid">
      <div class="card-metrica">
        <h5>Total de Alunos</h5>
        <p class="valor">${alunos.length}</p>
      </div>
      <div class="card-metrica">
        <h5>Alunos Aprovados</h5>
        <p class="valor">${aprovados.length} <small>(${((aprovados.length / alunos.length) * 100).toFixed(0)}%)</small></p>
      </div>
      <div class="card-metrica">
        <h5>Média das Notas</h5>
        <p class="valor">${mediaNotas}</p>
      </div>
      <div class="card-metrica">
        <h5>Média das Idades</h5>
        <p class="valor">${mediaIdades} <small>anos</small></p>
      </div>
    </div>

    <h5>Alunos por Curso (reduce):</h5>
    <ul>
      <li><strong>JavaScript:</strong> ${porCurso.JavaScript || 0} aluno(s)</li>
      <li><strong>Python:</strong> ${porCurso.Python || 0} aluno(s)</li>
      <li><strong>Java:</strong> ${porCurso.Java || 0} aluno(s)</li>
    </ul>

    <h5>Nomes em Ordem Alfabética (sort & map):</h5>
    <p>${nomesOrdenados.join(', ')}</p>
  `;

  exibirResultadoRelatorio('Relatório Consolidado', html);
  console.log('[RELATÓRIO - VISÃO CONSOLIDADA]', {
    totalAlunos: alunos.length,
    aprovados: aprovados.length,
    mediaNotas,
    mediaIdades,
    nomesOrdenados,
    porCurso
  });
}

/**
 * Atualiza o container de resultado dos relatórios na interface.
 * @param {string} titulo - Título do relatório
 * @param {string} conteudoHtml - Conteúdo HTML a ser renderizado
 */
function exibirResultadoRelatorio(titulo, conteudoHtml) {
  painelRelatorio.innerHTML = `
    <div class="relatorio-box">
      <h3>${titulo}</h3>
      ${conteudoHtml}
    </div>
  `;
}

/**
 * Carga de dados de exemplo para facilitar testes rápidos da aplicação.
 */
function carregarDadosExemplo() {
  alunos = [
    new Aluno('Carlos Henrique Silva', 23, 'JavaScript', 8.5),
    new Aluno('Beatriz Oliveira Costa', 29, 'Python', 9.2),
    new Aluno('Ana Paula Souza', 21, 'Java', 6.0),
    new Aluno('Daniel Albuquerque', 34, 'Python', 7.0),
    new Aluno('Eduardo Martins', 19, 'JavaScript', 5.5),
    new Aluno('Fernanda Ribeiro', 27, 'Java', 8.8)
  ];

  cancelarEdicao(false);
  renderizarTabela();
  relatorioTodos();

  console.log('[CARGA DE EXEMPLO] 6 alunos foram carregados em memória.');
  alert('6 alunos de exemplo foram carregados com sucesso! Você pode visualizar a tabela e os relatórios.');
}

/**
 * Limpa todos os alunos da memória.
 */
function limparTodosAlunos() {
  if (alunos.length === 0) {
    alert('A lista de alunos já está vazia.');
    return;
  }

  const confirmou = confirm('Tem certeza de que deseja excluir TODOS os alunos cadastrados?');
  if (!confirmou) return;

  alunos = [];
  cancelarEdicao(false);
  renderizarTabela();
  painelRelatorio.innerHTML = '<p class="texto-aviso">Nenhum relatório gerado no momento. Clique em um dos botões acima.</p>';

  console.log('[LIMPAR DADOS] Todos os alunos foram removidos da memória.');
  alert('Todos os dados foram apagados da memória com sucesso.');
}

/* ==========================================================================
   Exercício 3: Escutadores de Eventos (addEventListener) com Funções Anônimas
   ========================================================================== */

// Evento submit do formulário: intercepta envio e salva aluno
formAluno.addEventListener('submit', function (event) {
  event.preventDefault();
  salvarAluno();
});

// Evento de clique para cancelar edição (função anônima)
btnCancelarEdicao.addEventListener('click', function () {
  cancelarEdicao(true);
});

// Eventos de clique para os botões de relatório (funções anônimas - Exercício 3 e 4)
btnRelatorioAprovados.addEventListener('click', function () {
  relatorioAlunosAprovados();
});

btnRelatorioMediaNotas.addEventListener('click', function () {
  relatorioMediaNotas();
});

btnRelatorioMediaIdades.addEventListener('click', function () {
  relatorioMediaIdades();
});

btnRelatorioNomesOrdem.addEventListener('click', function () {
  relatorioNomesOrdemAlfabetica();
});

btnRelatorioQtdCurso.addEventListener('click', function () {
  relatorioQuantidadePorCurso();
});

btnRelatorioTodos.addEventListener('click', function () {
  relatorioTodos();
});

// Botões utilitários de teste e limpeza
btnCargaExemplo.addEventListener('click', function () {
  carregarDadosExemplo();
});

btnLimparTodos.addEventListener('click', function () {
  limparTodosAlunos();
});

// Inicialização da interface ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  renderizarTabela();
  console.log('[SISTEMA INICIADO] DevTech Academy - Gerenciamento de Alunos pronto para uso.');
});
