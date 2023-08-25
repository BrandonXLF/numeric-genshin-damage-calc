export interface EnkaBuild {
    avatarId: number;
    propMap: Record<number, { type: number, val: string }>;
    fightPropMap: Record<number, number>;
}

export interface ImportedIdentity {
    name: string;
    icon: React.ReactNode;
}

type ImportedCharacter = EnkaBuild & ImportedIdentity;

export default ImportedCharacter;