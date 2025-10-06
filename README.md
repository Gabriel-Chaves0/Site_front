# NovaTI — Site de Serviços de TI (HTML/CSS/JS puro)

Projeto simples em **HTML, CSS e JavaScript** que simula um site de empresa de TI com **cadastro, login, troca de senha** e **solicitação de serviços** (tabela com linhas fixas + inclusão dinâmica).

## ✅ Principais recursos
- Layout responsivo (grid/flex) + tabela para organização.
- **Validações completas** em JS:
  - E-mail, CPF (máscara + dígitos verificadores), telefone BR (opcional), maioridade (18+).
  - Senha forte (mín. 6, 1 número, 1 maiúscula, **apenas** caracteres permitidos).
- **Máscaras**: CPF e telefone.
- **Sessão** (localStorage) para exibir link condicional “Solicitar serviços”.
- Página de serviços com **tabela ordenada por data**, exclusão de linhas e cálculo de **preço/SLA/data prevista**.

## 🗂 Estrutura de pastas
```
/css
  main.css
/js
  common.js
index.html
login.html
register.html
change-password.html
services.html
```

## 📄 Páginas
- **index.html** — Home (apresentação, galeria, serviços, fundadores e vídeo).
- **login.html** — Login com validação e criação de sessão.
- **register.html** — Cadastro com máscaras e validações.
- **change-password.html** — Troca de senha (mesmas regras do cadastro).
- **services.html** — Solicitação de serviços (tabela com linhas fixas + inclusão/exclusão).

## 🔐 Regras de senha (resumo)
- Mínimo **6** caracteres, com **1 número**, **1 letra maiúscula** e **1 caractere especial permitido**.  
- Permitidos: `@ # $ % & * ! ? / \ | - _ + . =`  
- **Não permitidos**: `¨ { } [ ] ´ \` ~ ^ : ; < > , " '`

## ▶️ Como executar
1. Baixe/clonar o projeto.
2. Abra o arquivo **`index.html`** no navegador (duplo clique já funciona).
3. Para testar:
   - Faça **login** (qualquer e-mail/senha que passem na validação) → o link “Solicitar serviços” aparece.
   - Em **Cadastro**, teste CPF/telefone/senha/data.
   - Em **Serviços**, selecione um serviço → veja **preço/SLA/data prevista** → **Incluir** para adicionar na tabela; use **Excluir** por linha.

## 🛠 Tecnologias
- HTML5, CSS3 e JavaScript puro (sem bibliotecas).
- Armazenamento local: **localStorage** (simples, apenas para sessão de demonstração).

## 🎯 Personalização rápida
- **Cores/tema**: editar variáveis no `:root` de `css/main.css`.
- **Serviços/valores**: ajustar o objeto `SERVICES` em `services.html`.

---

Feito com ❤️. Ajusto para sua marca se quiser!
