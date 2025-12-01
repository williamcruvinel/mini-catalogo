export async function buscarCards() {
  try {
    const res = await fetch('http://localhost:3000/cards');
    if (!res.ok) throw new Error('Erro ao carregar /cards');
    return await res.json();
  } catch (err) {
    console.error('Erro API:', err);
    return [];
  }
}