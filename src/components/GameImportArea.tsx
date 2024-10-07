import React, { useEffect } from "react";
import '../less/GameImportArea.less';
import elements, { elementColors, energyTypeElementMap } from "../utils/elements";
import SVGButton from "./SVGButton";
import ImportedCharacter, { EnkaBuild, EnkaShown } from "../types/ImportedCharacter";
import FormInput from "./FormInput";
import SearchSVG from "../svgs/SearchSVG";
import ProfilePhoto from "./ProfilePhoto";
import { getIcon, getName } from "../utils/charInfo";
import { ColumnStateAction } from "../types/ColumnState";

export default function GameImportArea(props: Readonly<{
	closeAndDispatch: React.Dispatch<ColumnStateAction>;
}>) {
    const [inProgressUID, setInProgressUID] = React.useState<string>(localStorage.getItem('GIDC-uid') ?? '');
    const [element, setElement] = React.useState<typeof elements[number] | ''>('');
    const [uid, setUid] = React.useState<string | undefined>(undefined);
    const [profile, setProfile] = React.useState<{ name: string; icon: JSX.Element; } | undefined>();
    const [builds, setBuilds] = React.useState<ImportedCharacter[] | undefined>(undefined);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const elementSelectID = React.useId();

    useEffect(() => {
        setError(undefined);

        if (!uid) {
            setBuilds(undefined);
            setProfile(undefined);
            return;
        }

        (async () => {
            let res;

            try {
                res = await fetch(`${process.env.REACT_APP_ENKA_PROXY}/uid/${uid}`);
            } catch {
                setError('Could not connect to Enka.Network. Please check your internet connection.');
                setBuilds(undefined);
                setProfile(undefined);
                return;
            }

            let data = await res.json();

            if (!res.ok) {
                setError(data?.message || `Enka.Network API error. Status code ${res.status}.`);
                setBuilds(undefined);
                setProfile(undefined);
                return;
            }
  
            let enkaBuilds: EnkaBuild[] = data?.avatarInfoList || [];
            let enkaShown: EnkaShown[] = data?.playerInfo?.showAvatarInfoList || [];
            let characterBuilds: ImportedCharacter[] = [];

            for (let i = 0; i < enkaBuilds.length; i++) {
                const build = enkaBuilds[i];

                characterBuilds.push({
                    ...build,
                    icon: await getIcon(build.avatarId),
                    name: await getName(build.avatarId),
                    element: energyTypeElementMap[enkaShown[i].energyType]
                });
            }

            setBuilds(characterBuilds);

            setProfile({
                name: data.playerInfo.nickname,
                icon: <ProfilePhoto def={data.playerInfo.profilePicture} />
            })
        })();
    }, [uid])

    useEffect(() => localStorage.setItem('GIDC-uid', inProgressUID), [inProgressUID])
	
	return <div className="stat-import">
        <div>
            Powered by <a href="https://enka.network/" target="_blank" rel="noreferrer">Enka.Network</a>.
        </div>
        <div>
            <div className="flex-row">
                <FormInput
                    value={inProgressUID}
                    onChange={setInProgressUID}
                    placeholder="Genshin UID"
                />
                <SVGButton
                    svg={<SearchSVG />}
                    label="Search"
                    onClick={() => setUid(inProgressUID)}
                    mini
                />
            </div>
        </div>
        {profile && <div className="flex-row nickname-row">
            {profile.icon}
            <div>{profile.name}</div>
        </div>}
        <div className="flex-row">
            <label htmlFor={elementSelectID}>Damage Element</label>
            <FormInput
                value={element}
                onChange={val => setElement(val as typeof elements[number])}
                style={{ color: elementColors[element || 'Physical'] }}
                class="adaptive-width"
                id={elementSelectID}
                options={[
                    {
                        name: 'Character',
                        value: '',
                        style: { color: elementColors.Physical }
                    },
                    ...elements.map(element => ({
                        name: element,
                        value: element,
                        style: { color: elementColors[element] }
                    }))
                ]}
            />
        </div>
        {builds && builds.length > 0 && <>
            <div className="flex-row">
                <div className="notice">
                    Choose a character to import their stats.
                </div>
            </div>
            <div>
                {builds.map(build => <div key={build.avatarId}>
                    <SVGButton
                        svg={build.icon}
                        label={build.name}
                        onClick={() => props.closeAndDispatch({
                            type: 'import',
                            build: build,
                            element: element
                        })}
                        style={{ color: elementColors[element || build.element] }}
                    />
                </div>)}
            </div>
            <div className="flex-row">
                <div className="notice">
                    (1) Talent info (<a href="https://genshin-impact.fandom.com/wiki/Combat_Talent" target="genshin-wiki">wiki</a>),
                    (2) conditional stat increases, and
                    (3) attack/reaction type damage bonuses are not imported.
                </div>
            </div>
        </>}
        {error && <div className="flex-row">
            <div className="notice">{error}</div>
        </div>}
        {!error && builds && builds.length === 0 && <div className="flex-row">
            <div className="notice">
                No builds found. Make sure character details are shown in-game.
            </div>
        </div>}
        {!error && uid && !builds && <div>Loading...</div>}
    </div>;
}