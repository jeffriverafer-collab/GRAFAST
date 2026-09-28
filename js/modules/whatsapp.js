/* ---------- Enlaces de WhatsApp ----------
   El número viene de src/_data/contacto.json: la plantilla base lo escribe en
   <body data-whatsapp="...">, así JS y HTML comparten la misma fuente. */
export function whatsappLink(texto) {
  const base = `https://wa.me/${document.body.dataset.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}
