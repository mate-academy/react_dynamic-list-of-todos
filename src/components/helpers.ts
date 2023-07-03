export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function normalize(str: string) {
  return str.replace(/\s/g, '').toLowerCase();
}
