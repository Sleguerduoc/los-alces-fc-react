export function exportReportCsv(filename, rows) {

  const isPairs = Array.isArray(rows[0]) && rows[0].length === 2 && typeof rows[0][0] === "string";
  let csv = "";

  if (isPairs) {
    csv = "Campo,Valor\n" + rows.map(r => `${escapeCsv(r[0])},${escapeCsv(r[1])}`).join("\n");
  } else {
    csv = rows.map(r => r.map(escapeCsv).join(",")).join("\n");
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeCsv(v) {
  if (v == null) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
