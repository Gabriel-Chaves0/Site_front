export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const PHONE_BR_RE = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const PW_ALLOWED = /[@#$%&*!?\/\\|\-_.+=]/;
const PW_ALLOWED_ALL = /^([A-Za-z0-9@#$%&*!?\/\\|\-_.+=])+$/;

export function isStrongPassword(pw: string) {
  if (!pw || pw.length < 6) return false;
  const hasNum = /\d/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasSpecial = PW_ALLOWED.test(pw);
  const allowedOnly = PW_ALLOWED_ALL.test(pw);
  return hasNum && hasUpper && hasSpecial && allowedOnly;
}

export function validarCPF(cpf: string) {
  const value = (cpf || "").replace(/\D/g, "");
  if (!value || value.length !== 11 || /^(\d)\1{10}$/.test(value)) return false;
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(value.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(value.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(value.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(value.substring(10, 11));
}

export function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export function nomeValido(n: string) {
  if (!n) return false;
  if (/[^A-Za-zÀ-ÿ\s]/.test(n)) return false;
  const parts = n.trim().split(/\s+/);
  return parts.length >= 2 && parts[0].length >= 2;
}

export function isAdult(iso: string) {
  const birth = new Date(iso);
  if (Number.isNaN(birth.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 18;
}
