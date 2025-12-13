const alphabet =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = alphabet.length;

export const encode = (num: number): string => {
    if (num === 0) return alphabet[0] as string;

    let result = '';

    while (num > 0) {
        const remainder = num % base;
        result = alphabet[remainder] + result;
        num = Math.floor(num / base);
    }

    return result;
};

export const decode = (base62: string): number => {
    let num = 0;

    for (let i = 0; i < base62.length; i++) {
        const char = base62[i];
        const power = base62.length - (i + 1);
        const index = alphabet.indexOf(char as string);
        num += index * Math.pow(base, power);
    }

    return num;
};
