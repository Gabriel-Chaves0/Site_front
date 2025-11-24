const founders = [
  {
    role: "CEO",
    name: "Ana Souza",
    summary:
      "15+ anos em gestão de produtos digitais. Ex-consultora em transformação digital.",
  },
  {
    role: "CTO",
    name: "Bruno Lima",
    summary:
      "Arquiteto de software, cloud e segurança. Liderou migrações para multi-cloud.",
  },
  {
    role: "COO",
    name: "Carla Mendes",
    summary:
      "Especialista em processos, ITIL e qualidade. Foco em escalabilidade operacional.",
  },
];

const staticServices = [
  { title: "Sites e Portais", text: "Front-end, CMS e otimização SEO.", price: 4500 },
  {
    title: "Migração para Cloud",
    text: "AWS, Azure e GCP, com automação.",
    price: 6900,
  },
  { title: "Data & Analytics", text: "ETL, dashboards e governança.", price: 7900 },
];

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <div className="panel">
          <h2>Quem somos</h2>
          <div className="about-scroll">
            <p>
              A <strong>NovaTI</strong> nasceu em 2017 com a missão de simplificar a
              tecnologia para empresas brasileiras. Atuamos com{" "}
              <em>desenvolvimento web</em>, <em>cloud</em>, <em>dados</em> e{" "}
              <em>segurança</em>.
            </p>
            <p>
              Com times multidisciplinares, entregamos soluções modernas, seguras e
              escaláveis, mantendo parceria de longo prazo com nossos clientes.
            </p>
            <p>
              Ao longo dos anos, investimos em <b>pessoas</b> e <b>processos</b> para
              sustentar um crescimento sólido e ético.
            </p>
            <p>Conheça abaixo nossos serviços e equipe fundadora.</p>
          </div>
          <div className="kpis" aria-hidden="true">
            <div className="kpi">
              <div className="muted">Clientes ativos</div>
              <div className="h2">120+</div>
            </div>
            <div className="kpi">
              <div className="muted">Projetos/ano</div>
              <div className="h2">80+</div>
            </div>
            <div className="kpi">
              <div className="muted">Satisfação</div>
              <div className="h2">98%</div>
            </div>
          </div>
        </div>
        <aside className="panel">
          <h2>Vídeo institucional (1 min)</h2>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: "0.8rem",
              border: "1px solid var(--border)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/ukiXf58iqSU?si=9nWWM-U6BXX5_1bL"
              title="Institucional NovaTI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </aside>
      </section>

      <section className="panel">
        <h2>Galeria</h2>
        <div className="gallery" title="Rolagem automática para conteúdo longo">
          <img src="https://picsum.photos/seed/gal1/600/400" alt="Escritório 1" />
          <img src="https://picsum.photos/seed/gal2/600/400" alt="Escritório 2" />
          <img src="https://picsum.photos/seed/gal3/600/400" alt="Equipe 1" />
          <img src="https://picsum.photos/seed/gal4/600/400" alt="Equipe 2" />
        </div>
      </section>

      <section className="panel">
        <h2>Principais serviços</h2>
        <div className="services">
          {staticServices.map((s) => (
            <div className="card" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="price">A partir de R$ {s.price.toLocaleString("pt-BR")}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Fundadores</h2>
        <table id="founders-table" className="table">
          <thead>
            <tr>
              <th>Cargo</th>
              <th>Nome</th>
              <th>Resumo (CV)</th>
            </tr>
          </thead>
          <tbody>
            {founders.map((f) => (
              <tr key={f.name}>
                <td>{f.role}</td>
                <td>{f.name}</td>
                <td>{f.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
