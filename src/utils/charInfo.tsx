import StatIcon from "../svgs/StatIcon";

let nameResourcesPromise: Promise<[
    Record<string, {
        Element: string,
        NameTextMapHash: string;
        SideIconName: string;
    } | undefined>,
    { en: Record<string, string | undefined> }
]> | undefined;

function getNameResources() {
    if (!nameResourcesPromise) {
        nameResourcesPromise = new Promise(async resolve => {
            try {
                resolve(Promise.all([
                    (await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json')).json(),
                    (await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json')).json()
                ]));
            } catch {
                resolve([{}, {en: {}}]);
            }
        });
    }

    return nameResourcesPromise;
}

export async function getName(avatarId: number) {
    const [charInfos, loc] = await getNameResources();
    const nameHash = charInfos[avatarId]?.NameTextMapHash;

    return (nameHash && loc.en[nameHash]) || avatarId.toString();
}

export async function getIcon(avatarId: number) {
    const [charInfos,] = await getNameResources();
    const path =  charInfos[avatarId]?.SideIconName.replace('_Side', '');

    if (!path) return <StatIcon base="character" />;
    return <img src={`https://enka.network/ui/${path}.png`} alt="" />;
}