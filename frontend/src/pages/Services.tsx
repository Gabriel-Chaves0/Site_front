import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useSession } from "../session";
import type { Service, Solicitation } from "../types";
import { addDays, fmtDateBR, fmtDateISO, fmtPrice } from "../utils/helpers";

type MsgType = "ok" | "bad" | "warn" | "";

export default function Services() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [requests, setRequests] = useState<Solicitation[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<MsgType>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }
    loadData(session.login);
  }, [session]);

  const loadData = async (login: string) => {
    setLoading(true);
    const [svcRes, reqRes] = await Promise.all([
      api.listServices(),
      api.getSolicitations(login),
    ]);
    setLoading(false);

    if (svcRes.ok && svcRes.data) setServices(svcRes.data);
    if (reqRes.ok && reqRes.data) setRequests(reqRes.data);
    if (!svcRes.ok) showMsg(svcRes.error || "Erro ao carregar serviços.", "bad");
    if (!reqRes.ok) showMsg(reqRes.error || "Erro ao carregar solicitações.", "bad");
  };

  const selectedService = useMemo(
    () => services.find((s) => s.id === Number(selected)),
    [services, selected]
  );

  const showMsg = (text: string, type: MsgType) => {
    setMsg(text);
    setMsgType(type);
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!session) return;
    if (!selectedService) {
      showMsg("Selecione um serviço.", "bad");
      return;
    }
    const now = new Date();
    const newItem: Solicitation = {
      id: Date.now(),
      service_id: selectedService.id,
      service_name: selectedService.name,
      status: "EM ELABORAÇÃO",
      price: selectedService.price,
      created_at: fmtDateISO(now),
      expected_date: fmtDateISO(addDays(now, selectedService.deadline)),
    };
    setRequests((prev) => [...prev, newItem]);
    showMsg("Solicitação incluída no carrinho.", "ok");
    setSelected("");
  };

  const handleRemove = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = async () => {
    if (!session) return;
    setSaving(true);
    const res = await api.saveSolicitations(
      session.login,
      requests.map((r) => ({
        service_id: r.service_id,
        status: r.status,
      }))
    );
    setSaving(false);
    if (!res.ok || !res.data) {
      return showMsg(res.error || "Falha ao salvar solicitações.", "bad");
    }
    setRequests(res.data);
    showMsg("Solicitações atualizadas.", "ok");
  };

  return (
    <main className="container page">
      <section className="panel">
        <h1>Solicitação de serviços</h1>
        <p className="muted">
          {session ? `Cliente: ${session.name} – ${session.login}` : "Cliente não identificado"}
        </p>
      </section>

      <section className="grid-2">
        <div className="panel">
          <h2>Minhas solicitações</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Data do pedido</th>
                  <th>#</th>
                  <th>Serviço</th>
                  <th>Status</th>
                  <th>Preço (R$)</th>
                  <th>Previsto</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={7}>Nenhuma solicitação ainda.</td>
                  </tr>
                )}
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td>{fmtDateBR(r.created_at)}</td>
                    <td>{r.id}</td>
                    <td>{r.service_name}</td>
                    <td>{r.status}</td>
                    <td>{fmtPrice(r.price)}</td>
                    <td>{fmtDateBR(r.expected_date)}</td>
                    <td>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => handleRemove(r.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex" style={{ marginTop: "1rem" }}>
            <button type="button" onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Atualizar solicitações"}
            </button>
          </div>
        </div>

        <div className="panel">
          <h2>Nova solicitação</h2>
          <form onSubmit={handleAdd} id="svcForm">
            <label htmlFor="svc">Serviço de TI</label>
            <select
              id="svc"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Selecione...</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <div className="grid-2">
              <div>
                <label>Preço</label>
                <div className="card">
                  {selectedService ? `R$ ${fmtPrice(selectedService.price)}` : "—"}
                </div>
              </div>
              <div>
                <label>Prazo (dias)</label>
                <div className="card">
                  {selectedService ? `${selectedService.deadline} dias` : "—"}
                </div>
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label>Data prevista</label>
                <div className="card">
                  {selectedService
                    ? fmtDateBR(addDays(new Date(), selectedService.deadline))
                    : "—"}
                </div>
              </div>
              <div>
                <label>Status</label>
                <div className="card">EM ELABORAÇÃO</div>
              </div>
            </div>

            <button type="submit">Incluir solicitação</button>
          </form>
        </div>
      </section>

      <div className={`msg ${msgType}`} aria-live="polite">
        {msg}
      </div>
    </main>
  );
}
