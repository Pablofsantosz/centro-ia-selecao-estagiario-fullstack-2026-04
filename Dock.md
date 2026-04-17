



Este projeto é um **MVP (Minimum Viable Product)** desenvolvido para o desafio técnico de seleção de estágio FullStack do Centro de IA da UNICAP (04/2026). A aplicação utiliza Inteligência Artificial para automatizar a ponte entre requisitos de negócio e testes de software.

---

## 1. Nome da Solução
**QA Assistant** — Gerador Inteligente de Testes BDD e Automação Cypress.

## 2. Problema Escolhido
No fluxo de desenvolvimento de software, existe um gargalo crítico na fase de Qualidade (QA): o tempo gasto na tradução manual de *User Stories* em cenários de teste Gherkin (BDD) e, posteriormente, na codificação desses testes em ferramentas de automação como o Cypress. Este processo é repetitivo, sujeito a erros de sintaxe e consome horas que poderiam ser dedicadas à análise estratégica.

## 3. Objetivo da Aplicação
O objetivo é acelerar a produtividade do time de QA, utilizando IA Generativa para transformar descrições de funcionalidades em linguagem natural em dois artefatos técnicos prontos para uso:
1.  **Cenários BDD (Gherkin):** Para documentação viva e alinhamento com o negócio.
2.  **Scripts Cypress:** Para execução imediata da automação de testes.

## 4. Descrição do Caso de Uso
Um Analista de QA recebe uma nova tarefa, por exemplo: *"Criar testes para a funcionalidade de troca de senha via e-mail"*.
1.  O usuário insere essa descrição no **QA Assistant**.
2.  O sistema gera automaticamente os cenários de teste (Caminho Feliz, Erro de Token, Email Inválido).
3.  O sistema gera o código Cypress correspondente, já configurado com seletores e comandos.
4.  O usuário pode copiar os códigos ou consultar o histórico de gerações anteriores salvo localmente no navegador.

## 5. Tecnologias Utilizadas
* **Front-end:** Next.js 14 (App Router), Tailwind CSS, React.
* **Back-end:** Python 3.10+, FastAPI (Framework principal).
* **Inteligência Artificial:** Groq Cloud API (Modelo Llama 3.1).
* **Persistência:** LocalStorage (Histórico local no navegador).

---

## 6. Arquitetura Geral da Solução
A solução segue uma arquitetura **Fullstack Monorepo** com separação clara de responsabilidades:

###  Frontend (Next.js)
Atua como o "Maestro", disparando requisições paralelas para o backend via `Promise.all` para garantir que a geração do Gherkin não bloqueie a do Cypress. Gerencia o estado global da aplicação e a persistência local dos dados.

###  Backend (FastAPI)
Funciona como um "Roteador" e "Orquestrador de Prompts". Implementa o **Padrão Strategy** para isolar as instruções da IA, facilitando a adição de novos frameworks (ex: Playwright) no futuro sem alterar a base do código (seguindo os princípios SOLID).

###  Camada de IA (Groq Cloud)
Integração com a Groq para processamento de linguagem natural com baixíssima latência, permitindo uma experiência de uso fluida.

---

## 7. Instruções de Instalação e Execução

### Back-end (Python + FastAPI)
1.  Acesse a pasta do backend: `cd backend`
2.  Crie um ambiente virtual: `python -m venv venv`
3.  Ative o ambiente: 
    * Windows: `venv\\Scripts\\activate`
    * Linux/Mac: `source venv/bin/activate`
4.  Instale as dependências: `pip install -r requirements.txt`
5.  Crie um arquivo `.env` com a sua chave da Groq: `GROQ_API_KEY=sua_chave_aqui`
6.  Inicie o servidor: `uvicorn app.main:app --reload`

### Front-end (Next.js)
1.  Acesse a pasta do frontend: `cd frontend`
2.  Instale as dependências: `npm install`
3.  Inicie o servidor de desenvolvimento: `npm run dev`
4.  Acesse em: `http://localhost:3000`

---

## 8. Explicação de como a IA foi integrada
A IA foi integrada através da API da **Groq**, utilizando o modelo **Llama 3.1** com técnicas de **Prompt Engineering**:
* **Persona:** A IA é configurada para atuar como um "Engenheiro de QA Sênior".
* **Temperatura (0.3):** Foi configurada uma temperatura baixa para garantir respostas determinísticas, lógicas e sem "alucinações" criativas, o que é crucial para gerar código funcional.
* **Estratégias de Prompt:** Utilizamos um sistema de prompts no backend (pasta `services/strategies.py`) que força a IA a devolver apenas o código ou o texto BDD bruto, sem explicações desnecessárias.

---

## 9. Exemplos de Uso da Aplicação
1.  **Entrada:** *"Funcionalidade de carrinho de compras: adicionar produto e validar valor total."*
2.  **Saída Gherkin:** Cenários detalhando o `Dado`, `Quando` e `Então` do carrinho.
3.  **Saída Cypress:** Código pronto com comandos `cy.get`, `cy.click` e asserções `should`.

---

## 10. Limitações Atuais do MVP
* O histórico é salvo apenas no `LocalStorage`, perdendo-se se o cache do navegador for limpo.
* Gera apenas scripts em Cypress (JavaScript).
* Não possui integração direta com APIs de CI/CD para execução automatizada.

## 11. Possíveis Evoluções Futuras
* **Novas Estratégias:** Suporte para Playwright, Robot Framework e Selenium.
* **Base de Dados:** Integração com PostgreSQL para salvar histórico em nuvem vinculado a uma conta de usuário.
* **Geração de Relatórios:** Exportação dos cenários gerados em PDF ou Excel para apresentação ao time de negócio (PO/Stakeholders).

---
**Pablo Felipe dos Santos** - Ciência da Computação (6º Período - UNICAP)
"""
