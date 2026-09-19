// Období výroby je nepovinné. Když ho nikdo nezná, bývá v poli „neuvedeno"
// apod. — na webu se pak nemá ukázat vůbec, ne jako „Období: neuvedeno".
const NEZNAMO = /^(-+|\?+|neuvedeno|neuveden[oý]?|nezn[aá]m[eéoý]?|nev[ií]m|nezji[sš]t[eě]no|n\/a)$/i

export function obdobi(hodnota?: string | null): string | null {
  const text = hodnota?.trim()
  if (!text || NEZNAMO.test(text)) return null
  return text
}
