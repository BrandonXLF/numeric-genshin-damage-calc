import elements from "../utils/elements";

export interface EnkaBuild {
    avatarId: number;
    propMap: Record<number, { type: number, val: string }>;
    fightPropMap: Record<number, number>;
}

export interface EnkaShown {
    energyType: number;
}

export interface ImportedIdentity {
    name: string;
    icon: Promise<React.ReactNode>;
    element: typeof elements[number];
}

type ImportedCharacter = EnkaBuild & ImportedIdentity;

export default ImportedCharacter;