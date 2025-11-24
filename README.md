# NovaTI — Frontend React (Vite) + Backend FastAPI + SQLite 🚀

Projeto AV2 migrado do AV1 (HTML/CSS/JS puro) para React e FastAPI, mantendo o layout original e os fluxos de cadastro, login, troca de senha e solicitações de serviços.

## ✅ Principais recursos
- Layout responsivo preservando o visual do AV1.
- Frontend em React (Vite) com hooks, sem manipulação direta de DOM.
- Backend em FastAPI + SQLAlchemy + SQLite (tabelas Cliente, Serviço de TI, Solicitação).
- Endpoints REST para autenticação, troca de senha, cadastro de cliente, cadastro/listagem de serviços e CRUD de solicitações.
- Integração front-back com respostas `{ ok, data?, error? }`.

## 📂 Estrutura de pastas
```
frontend/        # React + Vite
backend/         # FastAPI + SQLAlchemy + SQLite
legacy_av1/      # Projeto AV1 original (HTML/CSS/JS) como histórico
projeto_av2.pdf  # Enunciado
```

## 📄 Páginas (React)
- **Home** — apresentação e serviços estáticos do AV1.
- **Login** — validações e chamada a `/auth`.
- **Cadastro de cliente** — validações e POST `/clientes`.
- **Troca de senha** — validações e POST `/clientes/trocar-senha`.
- **Solicitações/Carrinho** — GET `/servicos`, GET/PUT `/solicitacoes/{login}`.
- **Cadastro de serviço TI** — validação e POST `/servicos`.

## 🔐 Regras de senha (resumo)
- Mínimo **6** caracteres, com **1 número**, **1 letra maiúscula** e **1 caractere especial permitido**.  
- Permitidos: `@ # $ % & * ! ? / \ | - _ + . =`  
- **Não permitidos**: `¨ { } [ ] ´ \` ~ ^ : ; < > , " '`

## ▶️ Como executar
1) **Backend**
```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate   # Windows
# deps: via uv (preferido) ou pip
uv sync                     # se usar uv e uv.lock
# ou: pip install fastapi "uvicorn[standard]" sqlalchemy python-decouple "pydantic[email]"
uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- Docs: http://localhost:8000/docs  
- SQLite criado automaticamente em `backend/app.db`.  
- CORS liberado para `http://localhost:5173` (ajuste `FRONTEND_ORIGIN` em `app/settings.py` se mudar).

2) **Frontend**
```bash
cd frontend
npm install
set VITE_API_URL=http://localhost:8000   # PowerShell; ajuste se a API estiver em outra porta/host
npm run dev
```
- Acesse: http://localhost:5173  
- Build produção: `npm run build` (prévia: `npm run preview`)

## 🔗 Endpoints principais
- `POST /auth` — login simples.
- `POST /clientes` — cadastrar cliente.
- `POST /clientes/trocar-senha` — trocar senha.
- `GET /clientes` — listar clientes.
- `DELETE /clientes/{login}` — remover cliente e solicitações.
- `POST /servicos` — cadastrar serviço (id autoincremento).
- `GET /servicos` — listar serviços.
- `GET /solicitacoes/{login}` — listar solicitações do cliente.
- `PUT /solicitacoes/{login}` — substituir solicitações do cliente.

## 🧪 Fluxo rápido de teste
1. Suba o backend (`uvicorn main:app --reload --port 8000`).  
2. Rode o frontend (`npm run dev`).  
3. No front: cadastrar cliente → logar → carregar serviços/solicitações → adicionar/atualizar solicitações → trocar senha → relogar.  
4. Opcional: testar direto via `/docs`.

## 🛠 Tecnologias
- Frontend: React + Vite.
- Backend: FastAPI + SQLAlchemy.
- Banco: SQLite (criação automática na primeira subida).

## 🎯 Personalização rápida
- Tema/cores: editar variáveis em `frontend/src/styles/main.css`.
- URL da API: definir `VITE_API_URL` no frontend; `FRONTEND_ORIGIN` no backend.
