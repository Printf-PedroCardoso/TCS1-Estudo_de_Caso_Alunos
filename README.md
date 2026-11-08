# DevTech Academy &bull; Sistema de Gerenciamento de Alunos

Sistema web de gerenciamento escolar desenvolvido como solução para a atividade **EC01 - Estudo de Caso 01** da disciplina de **Tecnologia de Construção de Software I**.

---

## 🎯 Objetivo Geral

A escola fictícia **“DevTech Academy”** necessitava de uma aplicação para cadastrar, listar, editar e excluir alunos, além de gerar relatórios estatísticos com base nos registros armazenados em memória.

O projeto foi construído de forma modular, cobrindo todos os requisitos e conceitos abordados nos **4 exercícios** propostos, além de contar com suporte a contêineres **Docker** e testes automatizados.

---

## 📚 Estrutura dos Exercícios Implementados

### 🔹 Exercício 1: Cadastro de Alunos com Formulário e Tabela (CRUD)
- **Formulário HTML sem dependências de frameworks**:
  - `Nome` (input do tipo `text`)
  - `Idade` (input do tipo `number`)
  - `Curso` (select com opções: *JavaScript*, *Python*, *Java*)
  - `Nota Final` (input do tipo `number` com validação de 0 a 10)
- **Ações e Listagem**:
  - Inserção de novos alunos ao clicar em **"Cadastrar"**.
  - Exibição dinâmica dos alunos em uma tabela HTML.
  - Cada registro possui botões individuais de **"Editar"** e **"Excluir"**.
  - Ao editar, o formulário é preenchido com os dados do aluno e o botão alterna para **"Salvar Alterações"**, permitindo também o cancelamento.
  - Armazenamento em memória através de um array de instâncias de `Aluno`.

### 🔹 Exercício 2: Uso de Classe com Atributos, Construtor e Métodos
- Implementação da classe `Aluno` no arquivo [`js/Aluno.js`](file:///home/pcard/Projetos/Faculdade/Tecnologia_de_Construção_de_Software_I/js/Aluno.js):
  - **Atributos**: `nome`, `idade`, `curso`, `notaFinal`.
  - **Construtor**: inicializa e normaliza os dados fornecidos.
  - **Método `isAprovado()`**: retorna `true` se `notaFinal >= 7.0`, caso contrário `false`.
  - **Método `toString()`**: retorna uma representação textual formatada contendo nome, idade, curso, nota final e situação (*Aprovado* ou *Reprovado*).

### 🔹 Exercício 3: Eventos, Funções Anônimas e Arrow Functions
- **Escutadores de Eventos**: registro feito via `addEventListener` tanto para o envio do formulário quanto para os botões dinâmicos de cada linha da tabela.
- **Funções Anônimas**: aplicadas nos manipuladores de eventos de clique dos botões e submissão do formulário.
- **Arrow Functions**: utilizadas nas operações de manipulação, iteração e processamento de arrays (`forEach`, `filter`, `map`, `reduce`, `sort`).
- **Feedback ao Usuário**: emissão de mensagens simultâneas via `alert()` e `console.log()` ao:
  - Salvar um novo aluno ou confirmar edição;
  - Carregar um aluno para edição;
  - Excluir um aluno da lista.

### 🔹 Exercício 4: Relatórios Estatísticos com Programação Funcional
Painel interativo com botões para geração de relatórios calculados dinamicamente a partir dos métodos de array do JavaScript:
1. **Listar Alunos Aprovados**: filtra alunos com nota final &ge; 7.0 utilizando `filter(aluno => aluno.isAprovado())`.
2. **Média das Notas Finais**: calcula a média aritmética de todas as notas finais utilizando `reduce()`.
3. **Média das Idades**: calcula a média da idade dos alunos matriculados utilizando `reduce()`.
4. **Nomes em Ordem Alfabética**: ordena e projeta apenas os nomes de A a Z sem mutar a lista original utilizando `sort()` e `map()`.
5. **Quantidade de Alunos por Curso**: agrupa a quantidade de alunos em JavaScript, Python e Java utilizando `reduce()`.
6. **Visão Geral Consolidada**: gera um dashboard com todos os indicadores consolidados simultaneamente.

---

## 🗂️ Estrutura de Diretórios

```
Tecnologia_de_Construção_de_Software_I/
├── EC01 - Alunos.pdf       # Documento original da atividade
├── index.html              # Interface web semântica (formulário, tabela e relatórios)
├── js/
│   ├── Aluno.js            # Exercício 2: Classe Aluno (atributos, métodos isAprovado e toString)
│   └── app.js              # Exercícios 1, 3 e 4: CRUD, eventos DOM, arrow functions e relatórios
├── css/
│   └── style.css           # Estilização limpa e moderna
├── tests/
│   └── aluno.test.js       # Testes unitários automatizados com node:test
├── Dockerfile              # Imagem Docker com Nginx Alpine para servir a aplicação
├── docker-compose.yml      # Configuração para execução rápida com Docker Compose
├── .dockerignore           # Arquivos ignorados pelo build Docker
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Metadados do projeto e comando npm test
└── README.md               # Documentação completa
```

---

## 🚀 Como Executar o Projeto

Você pode executar o projeto utilizando **Docker** (conforme solicitado na observação do estudo de caso) ou diretamente em seu navegador.

### Opção 1: Executando com Docker Compose (Recomendado)

Certifique-se de ter o Docker e Docker Compose instalados e execute no terminal:

```bash
# Subir o container em segundo plano
docker compose up -d

# Visualizar status
docker compose ps
```

Acesse no seu navegador:
👉 **[http://localhost:8080](http://localhost:8080)**

Para encerrar o container:
```bash
docker compose down
```

---

### Opção 2: Executando com Docker CLI puro

```bash
# Construir a imagem Docker
docker build -t devtech-academy .

# Iniciar o container mapeando a porta 8080
docker run -d -p 8080:80 --name devtech_app devtech-academy
```

Acesse em: **[http://localhost:8080](http://localhost:8080)**.

---

### Opção 3: Executando Localmente (sem Docker)

Como a aplicação é composta por HTML5, CSS3 e JavaScript puro (Vanilla JS), você pode executá-la diretamente:

- **Via navegador**: Dê um duplo clique no arquivo [`index.html`](file:///home/pcard/Projetos/Faculdade/Tecnologia_de_Construção_de_Software_I/index.html) para abri-lo diretamente no Chrome, Firefox, Edge ou Safari.
- **Via Python HTTP Server**:
  ```bash
  python3 -m http.server 8080
  ```
  Acesse: `http://localhost:8080`
- **Via VS Code / Live Server**: Clique com o botão direito em `index.html` e selecione *Open with Live Server*.

---

## 🧪 Execução de Testes Automatizados

O projeto conta com uma suíte de testes unitários escrita com o módulo nativo `node:test` do Node.js, validando a classe `Aluno`, regras de aprovação e todas as funções estatísticas de arrays (`filter`, `reduce`, `map`, `sort`).

Para rodar os testes:

```bash
npm test
```

Saída esperada:
```
✔ Exercício 2 - Classe Aluno (4 testes passados)
✔ Exercício 4 - Manipulação de Arrays (filter, map, reduce, sort) (5 testes passados)
ℹ pass 9
ℹ fail 0
```

---

## 🐙 Como Versionar e Compartilhar no GitHub

O repositório já está inicializado e com os commits organizados por exercício. Para vinculá-lo à sua conta do GitHub:

1. Crie um repositório vazio no GitHub (ex: `devtech-academy-alunos` ou `tecnologia-construcao-software-ec01`).
2. No terminal da pasta do projeto, execute os comandos:

```bash
# 1. Certifique-se de estar na branch main
git branch -M main

# 2. Adicione o endereço do seu repositório remoto do GitHub
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git

# 3. Envie os commits para o GitHub
git push -u origin main
```

---

## 👨‍💻 Autor

- **Pedro Cardoso da Mata**  
- Disciplina: Tecnologia de Construção de Software I
