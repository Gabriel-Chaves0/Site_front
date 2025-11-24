import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../session";

export function Header() {
  const { session, clearSession } = useSession();
  const navigate = useNavigate();

  const initials = session
    ? session.name
        .split(" ")
        .filter(Boolean)
        .reduce((acc, part, idx, arr) => {
          if (idx === 0 || idx === arr.length - 1) {
            return acc + part[0].toUpperCase();
          }
          return acc;
        }, "")
        .slice(0, 2)
    : "";

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container bar">
        <div className="brand">
          <img src="/logo.png" alt="Logo" />
          <div className="title">
            NovaTI <span className="badge">Empresa de Serviços de TI</span>
          </div>
        </div>
        <nav className="nav">
          <div className="nav-links">
            <Link to="/">Início</Link>
            {!session && (
              <>
                <Link className="link-login" to="/login">
                  Login
                </Link>
                <Link to="/register">Cadastrar cliente</Link>
              </>
            )}
            {session && (
              <>
                <Link className="link-services" to="/services">
                  Solicitar serviços
                </Link>
                <Link to="/service-create">Cadastrar serviço TI</Link>
                <Link to="/change-password">Trocar senha</Link>
              </>
            )}
          </div>
          {session && (
            <div className="user-box">
              <div className="avatar-circle">{initials || "?"}</div>
              <button
                id="btnLogout"
                className="logout-circle"
                onClick={handleLogout}
                type="button"
                aria-label="Sair"
                title="Sair"
              >
                Sair
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
