// Deterministic seeded PRNG so mock data is identical between server render
// and client hydration (avoids Next.js hydration mismatches from Math.random()).

export function mulberry32(seed: number) {
  let a = seed;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRand(seed: number) {
  const rand = mulberry32(seed);
  return {
    next: () => rand(),
    int: (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min,
    float: (min: number, max: number, digits = 1) =>
      Number((rand() * (max - min) + min).toFixed(digits)),
    pick: <T>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)],
    bool: (probability = 0.5) => rand() < probability,
  };
}
