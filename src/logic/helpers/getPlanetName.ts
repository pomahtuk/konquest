const ASCIIOffset = 65;
const getPlanetName = (index: number): string => String.fromCharCode(ASCIIOffset + index);

export default getPlanetName;
