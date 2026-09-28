import { readFileSync } from "node:fs";

// Fuente única del número de WhatsApp (también lo usan las plantillas como {{ contacto.whatsapp }})
const contacto = JSON.parse(readFileSync("./src/_data/contacto.json", "utf8"));

export default function (eleventyConfig) {
  // Archivos que se copian tal cual al sitio final (_site/), sin procesar
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  // {{ "Hola, quiero cotizar: X" | whatsapp }} → https://wa.me/51...?text=Hola%2C%20...
  // Sin texto ({{ "" | whatsapp }}) devuelve solo https://wa.me/51...
  eleventyConfig.addFilter("whatsapp", (texto) => {
    const base = `https://wa.me/${contacto.whatsapp}`;
    return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
  });

  return {
    dir: {
      input: "src",        // plantillas y datos que editas
      includes: "_includes",
      data: "_data",
      output: "_site",     // sitio generado (no se sube a Git)
    },
    htmlTemplateEngine: "njk",
  };
}
