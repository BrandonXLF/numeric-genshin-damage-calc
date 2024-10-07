import React, { useEffect } from "react";
import '../less/GameImportArea.less';
import elements, { elementColors } from "../utils/elements";
import SVGButton from "./SVGButton";
import ImportedCharacter from "../types/ImportedCharacter";
import FormInput from "./FormInput";
import SearchSVG from "../svgs/SearchSVG";
import { ColumnStateAction } from "../types/ColumnState";
import EnkaImporter, { EnkaImporterError } from "../utils/EnkaImporter";
import AsyncContent from "./AsyncContent";

type UIDSearchInstance = {uid: string};

export default function GameImportArea(props: Readonly<{
	closeAndDispatch: React.Dispatch<ColumnStateAction>;
}>) {
    const [inProgressUID, setInProgressUID] = React.useState<string>(localStorage.getItem('GIDC-uid') ?? '');
    const [element, setElement] = React.useState<typeof elements[number] | ''>('');
    const [uid, setUid] = React.useState<UIDSearchInstance | undefined>(undefined);
    const [profile, setProfile] = React.useState<{
        builds: ImportedCharacter[],
        user: { name: string; icon: Promise<JSX.Element>; }
    } | undefined>();
    const [error, setError] = React.useState<string | undefined>(undefined);
    const elementSelectID = React.useId();

    useEffect(() => {
        setError(undefined);

        if (!uid) {
            setProfile(undefined);
            return;
        }

        (async () => {
            try {
                setProfile(await EnkaImporter.getProfile(uid.uid));
            } catch (e) {
                if (!(e instanceof EnkaImporterError)) throw e;
                
                setError(e.message);
                setProfile(undefined);
            }
        })();
    }, [uid]);

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
                    onClick={() => {
                        setUid({uid: inProgressUID});
                        setProfile(undefined);
                    }}
                    mini
                />
            </div>
        </div>
        {profile && <div className="flex-row nickname-row">
            <AsyncContent promise={profile.user.icon} />
            <div>{profile.user.name}</div>
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
        {profile?.builds && profile.builds.length > 0 && <>
            <div className="flex-row">
                <div className="notice">
                    Choose a character to import their stats.
                </div>
            </div>
            <div>
                {profile.builds.map(build => <div key={build.avatarId}>
                    <SVGButton
                        svg={<AsyncContent promise={build.icon} />}
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
        {!error && profile?.builds && profile.builds.length === 0 && <div className="flex-row">
            <div className="notice">
                No builds found. Make sure character details are shown in-game.
            </div>
        </div>}
        {!error && uid && !profile && <div>Loading...</div>}
    </div>;
}