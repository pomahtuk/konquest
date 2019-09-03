export const randomInt = (min: number, max: number): number => min + Math.round(Math.random() * (max - min));
export const randomBool = (): boolean => !!Math.round(Math.random());
