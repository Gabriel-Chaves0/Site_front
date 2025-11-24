export function addDays(date: Date | string, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function fmtDateISO(d: Date | string) {
  return new Date(d).toISOString().slice(0, 10);
}

export function fmtDateBR(d: Date | string) {
  const dd = new Date(d);
  return dd.toLocaleDateString("pt-BR", { timeZone: "America/Recife" });
}

export function fmtPrice(num: number) {
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
