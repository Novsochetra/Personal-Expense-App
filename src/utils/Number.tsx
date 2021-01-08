export const to_K_Or_M_Format = (value: number): string => {
  switch (true) {
    case value >= 1_000_000:
      return `${(Math.round(value) / 1_000_000).toFixed(2)}M`;
    case value >= 1_000:
      return `${(Math.round(value) / 1_000).toFixed(2)}K`;
    case value >= 0:
      return String(value);
    default:
      return "N/A";
  }
};
