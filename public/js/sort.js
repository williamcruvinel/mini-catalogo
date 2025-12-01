export function ordenarPadrao(cards) {
  return [...cards]; 
}

export function ordenarPorNome(cards) {
  return [...cards].sort((a, b) =>
    a.titulo.localeCompare(b.titulo, 'pt-BR')
  );
}

export function ordenarPorLancamento(cards) {
  return [...cards].sort((a, b) => {
    const anoA = Number(a.lancamento);
    const anoB = Number(b.lancamento);
    return anoB - anoA; 
  });
}
