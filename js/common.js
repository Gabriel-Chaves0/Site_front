// Utilidades globais (links condicionais, helpers, máscaras, validações)

/* -------------------- Sessão/Login -------------------- */
const SESSION_KEY = "ti_company_session";
function setLoggedSession(email, name = "Cliente") {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, name, ts: Date.now() })
  );
}
function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
function hydrateHeader() {
  const s = getSession();
  const navServices = document.querySelectorAll(".link-services");
  navServices.forEach((a) => {
    a.style.display = s ? "inline-block" : "none";
  });
  const who = document.getElementById("whoami");
  if (who && s) {
    who.textContent = `${s.name} · ${s.email}`;
  }
}

/* -------------------- Regex e validações -------------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_BR_RE = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; // (81) 98888-7777 ou 81988887777

const PW_ALLOWED = /[@#$%&*!?\/\\|\-_\+\.\=]/; // pelo menos 1 permitido
const PW_ALLOWED_ALL = /^([A-Za-z0-9@#$%&*!?\/\\|\-_\+\.\=])+$/; // somente estes
const PW_FORBIDDEN = /[¨{}[\]´`~^:;<>,"'，]/; // inclui vírgula normal e variante
function isStrongPassword(pw) {
  if (!pw || pw.length < 6) return false;
  const hasNum = /\d/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasSpecial = PW_ALLOWED.test(pw);
  const allowedOnly = PW_ALLOWED_ALL.test(pw) && !PW_FORBIDDEN.test(pw);
  return hasNum && hasUpper && hasSpecial && allowedOnly;
}

/* -------------------- Máscaras -------------------- */
function maskCPF(input) {
  input.value = input.value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskPhone(input) {
  input.value = input.value.replace(/\D/g, "").slice(0, 11);
  const v = input.value;
  if (v.length <= 10) {
    input.value = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    input.value = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }
}

/* -------------------- CPF válido -------------------- */
function validarCPF(cpf) {
  cpf = (cpf || "").replace(/\D/g, "");
  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0,
    resto;
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
}

/* -------------------- Datas -------------------- */
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function fmtDateISO(d) {
  return new Date(d).toISOString().slice(0, 10);
}
function fmtDateBR(d) {
  const dd = new Date(d);
  return dd.toLocaleDateString("pt-BR", { timeZone: "America/Recife" });
}

/* -------------------- UI helpers -------------------- */
function setAlert(el, msg, type = "err") {
  el.textContent = msg;
  el.className = `msg ${type}`;
}
document.addEventListener("DOMContentLoaded", hydrateHeader);
