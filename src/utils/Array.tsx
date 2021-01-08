export const range = (amount: number): number[] =>
  Array.from(Array(amount)).map((_, i) => i);
