import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "../api";
import { EMAIL_RE, isStrongPassword } from "../utils/validators";

type MsgType = "ok" | "bad" | "warn" | "";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<MsgType>("");
  const [loading, setLoading] = useState(false);

  const showMsg = (text: string, type: MsgType) => {
    setMsg(text);
    setMsgType(type);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return showMsg("Preencha o login.", "bad");
    if (!EMAIL_RE.test(email)) return showMsg("Formato de e-mail inválido.", "bad");
    if (!oldPw) return showMsg("Preencha a senha atual.", "bad");
    if (!newPw) return showMsg("Preencha a nova senha.", "bad");
    if (!confirmPw) return showMsg("Confirme a senha.", "bad");
    if (newPw !== confirmPw) return showMsg("As senhas não conferem.", "bad");
    if (!isStrongPassword(newPw))
      return showMsg("Senha fraca/contém caracteres não permitidos. Revise as regras.", "bad");

    setLoading(true);
    const res = await api.changePassword({
      login: email.trim(),
      old_password: oldPw,
      new_password: newPw,
    });
    setLoading(false);

    if (!res.ok) return showMsg(res.error || "Falha ao trocar a senha.", "bad");

    showMsg("Senha alterada com sucesso.", "ok");
    setOldPw("");
    setNewPw("");
    setConfirmPw("");
  };

  const clear = () => {
    setEmail("");
    setOldPw("");
    setNewPw("");
    setConfirmPw("");
    setMsg("");
    setMsgType("");
  };

  return (
    <main className="container page page-medium panel">
      <h1>Troca de senha de clientes</h1>

      <div className="card">
        <h3>Regras da senha</h3>
        <ul>
          <li>Mínimo de <strong>6 caracteres</strong>;</li>
          <li>
            Conter pelo menos: <strong>1 número</strong>, <strong>1 letra maiúscula</strong> e{" "}
            <strong>1 caractere especial permitido</strong>;
          </li>
          <li>
            Especiais permitidos: <code>@ # $ % &amp; * ! ? / \ | - _ + . =</code>
          </li>
          <li>
            <span className="bad">Não permitidos</span>: <code>{`{ } [ ] \` ~ ^ : ; < > , " '`}</code>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Login (e-mail)</label>
        <input
          id="email"
          type="email"
          placeholder="voce@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="pwOld">Senha atual</label>
        <input
          id="pwOld"
          type="password"
          value={oldPw}
          onChange={(e) => setOldPw(e.target.value)}
          required
        />

        <label htmlFor="pw1">Nova senha</label>
        <input
          id="pw1"
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          required
        />

        <label htmlFor="pw2">Confirmar senha</label>
        <input
          id="pw2"
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          required
        />

        <div className={`msg ${msgType}`} aria-live="polite">
          {msg}
        </div>

        <div className="grid-2">
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Trocar Senha"}
          </button>
          <button type="button" className="secondary" onClick={clear}>
            Limpar
          </button>
        </div>
      </form>
    </main>
  );
}
