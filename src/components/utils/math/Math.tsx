export const RandomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const gcd = (a: number, b: number): number => {
    return !b ? a : gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
};
