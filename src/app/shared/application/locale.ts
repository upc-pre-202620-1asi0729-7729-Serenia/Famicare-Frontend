/** Locale Intl para el idioma de la interfaz ("es" → es-PE para horas con a. m./p. m.). */
export function intlLocale(lang: string | null | undefined): string {
  return lang === 'en' ? 'en-US' : 'es-PE';
}

/** Locale para números: en español se agrupan miles con punto ("6.420"), como en el diseño. */
export function numberLocale(lang: string | null | undefined): string {
  return lang === 'en' ? 'en-US' : 'es-CO';
}
