import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "../api";
import {
  EMAIL_RE,
  PHONE_BR_RE,
  isAdult,
  isStrongPassword,
  maskCPF,
  maskPhone,
  nomeValido,
  validarCPF,
} from "../utils/validators";

type MsgType = "ok" | "bad" | "warn" | "";

export default function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth, setBirth] = useState("");
  const [marital, setMarital] = useState("solteiro");
  const [school, setSchool] = useState("2º grau completo");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<MsgType>("");
  const [loading, setLoading] = useState(false);

  const clear = () => {
    setEmail("");
    setPhone("");
    setPw1("");
    setPw2("");
    setName("");
    setCpf("");
    setBirth("");
    setMarital("solteiro");
    setSchool("2º grau completo");
    setMsg("");
    setMsgType("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return showMsg("Preencha o e-mail.", "bad");
    if (!EMAIL_RE.test(email)) return showMsg("E-mail inválido.", "bad");

    if (!pw1) return showMsg("Preencha a senha.", "bad");
    if (!pw2) return showMsg("Confirme a senha.", "bad");
    if (pw1 !== pw2) return showMsg("Senhas não conferem.", "bad");
    if (!isStrongPassword(pw1))
      return showMsg("Senha não atende às regras.", "bad");

    if (!nomeValido(name))
      return showMsg(
        "Nome inválido. Use pelo menos nome e sobrenome e sem caracteres especiais.",
        "bad"
      );

    if (!cpf) return showMsg("Preencha o CPF.", "bad");
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf))
      return showMsg("CPF deve estar na máscara 000.000.000-00.", "bad");
    if (!validarCPF(cpf)) return showMsg("CPF inválido.", "bad");

    if (!birth) return showMsg("Preencha a data de nascimento.", "bad");
    if (!isAdult(birth)) return showMsg("É preciso ser maior de idade (18+).", "bad");

    if (phone && !PHONE_BR_RE.test(phone))
      return showMsg("Telefone em formato nacional inválido.", "bad");

    setLoading(true);
    const res = await api.registerClient({
      email: email.trim(),
      phone: phone || undefined,
      password: pw1,
      name: name.trim(),
      cpf: cpf.replace(/\D/g, ""),
      birth_date: birth,
      marital_status: marital,
      school_degree: school,
    });
    setLoading(false);

    if (!res.ok) {
      return showMsg(res.error || "Falha ao cadastrar.", "bad");
    }

    showMsg("Cadastro realizado com sucesso.", "ok");
    clear();
  };

  const showMsg = (text: string, type: MsgType) => {
    setMsg(text);
    setMsgType(type);
  };

  return (
    <main className="container page page-medium panel">
      <h1>Cadastro de clientes</h1>

      <div className="card">
        <h3>Regra de senha</h3>
        <p>
          Permitidos: <code>@ # $ % &amp; * ! ? / \ | - _ + . =</code> – Não permitidos:
          <code> {`{ } [ ] \` ~ ^ : ; < > , " '`}</code>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid-2">
          <div>
            <label htmlFor="email">E-mail (login)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="tel">Celular (opcional)</label>
            <input
              id="tel"
              type="tel"
              placeholder="(81) 9XXXX-XXXX"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
            />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label htmlFor="pw1">Senha</label>
            <input
              id="pw1"
              type="password"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="pw2">Confirmar Senha</label>
            <input
              id="pw2"
              type="password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(maskCPF(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="grid-3">
          <div>
            <label htmlFor="nasc">Data de nascimento</label>
            <input
              id="nasc"
              type="date"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="ec">Estado civil</label>
            <select
              id="ec"
              value={marital}
              onChange={(e) => setMarital(e.target.value)}
            >
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a)</option>
              <option value="divorciado">Divorciado(a)</option>
              <option value="viuvo">Viúvo(a)</option>
            </select>
          </div>
          <div>
            <label htmlFor="esc">Escolaridade</label>
            <select id="esc" value={school} onChange={(e) => setSchool(e.target.value)}>
              <option>1º grau incompleto</option>
              <option>1º grau completo</option>
              <option>2º grau completo</option>
              <option>Nível superior</option>
              <option>Pós-graduado</option>
            </select>
          </div>
        </div>

        <div className={`msg ${msgType}`} aria-live="polite">
          {msg}
        </div>

        <div className="grid-3">
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Incluir"}
          </button>
          <button type="button" onClick={clear} className="secondary">
            Limpar
          </button>
          <button type="button" onClick={() => history.back()} className="secondary">
            Voltar
          </button>
        </div>
      </form>
    </main>
  );
}
