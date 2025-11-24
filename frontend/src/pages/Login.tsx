import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useSession } from "../session";
import { EMAIL_RE } from "../utils/validators";

type MsgType = "ok" | "bad" | "warn" | "";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<MsgType>("");
  const [loading, setLoading] = useState(false);
  const { saveSession } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMsgType("bad");
      return setMsg("Preencha o login (e-mail).");
    }
    if (!EMAIL_RE.test(email)) {
      setMsgType("bad");
      return setMsg("E-mail em formato inválido.");
    }
    if (!password) {
      setMsgType("bad");
      return setMsg("Preencha a senha.");
    }

    setLoading(true);
    const res = await api.login({ login: email.trim(), password });
    setLoading(false);
    if (!res.ok || !res.data) {
      setMsgType("bad");
      setMsg(res.error || "Falha ao autenticar.");
      return;
    }
    setMsgType("ok");
    setMsg("Login realizado.");
    saveSession(res.data);
    navigate("/services");
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setMsg("");
    setMsgType("");
  };

  return (
    <main className="container page page-small panel">
      <h1>Login de clientes</h1>
      <p>
        <small className="help">Acesse com seu e-mail e senha.</small>
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="loginEmail">E-mail</label>
        <input
          id="loginEmail"
          type="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="loginPass">Senha</label>
        <input
          id="loginPass"
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={`msg ${msgType}`} aria-live="polite">
          {msg}
        </div>

        <div className="grid-2">
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Realizar Login"}
          </button>
          <button type="button" className="secondary" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </form>

      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span>
          Esqueceu? <a href="/change-password">Trocar senha</a>
        </span>
        <span>
          Não tem conta? <a href="/register">Cadastrar cliente</a>
        </span>
      </div>
    </main>
  );
}
