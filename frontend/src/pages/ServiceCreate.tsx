import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "../api";
import type { ServiceInput } from "../types";

type MsgType = "ok" | "bad" | "warn" | "";

export default function ServiceCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deadline, setDeadline] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<MsgType>("");
  const [loading, setLoading] = useState(false);

  const showMsg = (text: string, type: MsgType) => {
    setMsg(text);
    setMsgType(type);
  };

  const clear = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDeadline("");
    setMsg("");
    setMsgType("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return showMsg("Informe o nome do serviço.", "bad");
    if (!price) return showMsg("Informe o preço.", "bad");
    if (!deadline) return showMsg("Informe o prazo em dias.", "bad");
    const payload: ServiceInput = {
      name: name.trim(),
      description: description.trim() || undefined,
      price: Number(price),
      deadline: Number(deadline),
    };
    if (payload.price <= 0) return showMsg("Preço deve ser maior que zero.", "bad");
    if (payload.deadline <= 0) return showMsg("Prazo deve ser maior que zero.", "bad");

    setLoading(true);
    const res = await api.createService(payload);
    setLoading(false);
    if (!res.ok) return showMsg(res.error || "Falha ao salvar serviço.", "bad");
    showMsg("Serviço cadastrado.", "ok");
    clear();
  };

  return (
    <main className="container page page-medium panel">
      <h1>Cadastro de Serviço de TI</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="desc">Descrição</label>
        <textarea
          id="desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="grid-2">
          <div>
            <label htmlFor="price">Preço (R$)</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="deadline">Prazo (dias)</label>
            <input
              id="deadline"
              type="number"
              min="1"
              step="1"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={`msg ${msgType}`} aria-live="polite">
          {msg}
        </div>

        <div className="grid-2">
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar serviço"}
          </button>
          <button type="button" className="secondary" onClick={clear}>
            Limpar
          </button>
        </div>
      </form>
    </main>
  );
}
