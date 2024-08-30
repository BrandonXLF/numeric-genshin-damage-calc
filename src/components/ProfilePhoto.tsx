import React, { useEffect } from "react";
import StatIcon from "../svgs/StatIcon";
import { getIcon } from "../utils/charInfo";

let profilePhotoPromise: Promise<Record<number, string | undefined>> | undefined;

function getProfilePhotos() {
    if (!profilePhotoPromise) {
        profilePhotoPromise = new Promise(async resolve => {
            try {
                let photoArray = await (await fetch('https://glcdn.githack.com/Dimbreath/AnimeGameData/-/raw/master/ExcelBinOutput/ProfilePictureExcelConfigData.json')).json()
                let photoMap: Record<number, string | undefined> = {};
    
                for (let profilePhoto of photoArray) {
                    photoMap[profilePhoto.id] = profilePhoto.iconPath;
                }

                resolve(photoMap);
            } catch {
                resolve({});
            }
        })
        
    }

    return profilePhotoPromise;
}

async function getNonCharacterPhoto(id: number) {
    const profilePhotos = await getProfilePhotos();
    const photoName = profilePhotos[id]

    if (!photoName) return <StatIcon base="character" />;
    return <img src={`https://enka.network/ui/${photoName}.png`} alt="" />;
}

export default function ProfilePhoto(props: Readonly<{
	def: {
        avatarId?: number;
        id?: number;
    }
}>) {
    const [img, setImg] = React.useState<JSX.Element | undefined>();

    useEffect(() => {
        (async () => {
            if (props.def.avatarId) {
                setImg(await getIcon(props.def.avatarId));
            } else if (props.def.id) {
                setImg(await getNonCharacterPhoto(props.def.id));
            }
        })();
    }, [props.def])

    return img ?? '';
}