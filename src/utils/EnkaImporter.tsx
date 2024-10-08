import StatIcon from "../svgs/StatIcon";
import ImportedCharacter, { EnkaBuild, EnkaShown } from "../types/ImportedCharacter";
import { energyTypeElementMap } from "./elements";

export class EnkaImporterError extends Error {}

export default class EnkaImporter {
	private static nameResourcesPromise: Promise<[
		Record<string, {
			Element: string,
			NameTextMapHash: string;
			SideIconName: string;
		} | undefined>,
		{ en: Record<string, string | undefined> }
	]> | undefined;
	
	private static getNameResources() {
		if (!EnkaImporter.nameResourcesPromise) {
			EnkaImporter.nameResourcesPromise = (async () => {
				try {
					return Promise.all([
						(await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json')).json(),
						(await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json')).json()
					]);
				} catch {
					return [{}, {en: {}}];
				}
			})();
		}
	
		return EnkaImporter.nameResourcesPromise;
	}
	
	private static profilePhotoPromise: Promise<Record<number, string | undefined>> | undefined;

	private static getProfilePhotos() {
		if (!EnkaImporter.profilePhotoPromise) {
			EnkaImporter.profilePhotoPromise = (async () => {
				try {
					let photoArray = await (await fetch('https://glcdn.githack.com/Dimbreath/AnimeGameData/-/raw/master/ExcelBinOutput/ProfilePictureExcelConfigData.json')).json()
					let photoMap: Record<number, string | undefined> = {};
		
					for (let profilePhoto of photoArray) {
						photoMap[profilePhoto.id] = profilePhoto.iconPath;
					}

					return photoMap;
				} catch {
					return {};
				}
			})();
		}

		return EnkaImporter.profilePhotoPromise;
	}
	
	static async getCharacterName(avatarId: number) {
		const [charInfos, loc] = await EnkaImporter.getNameResources();
		const nameHash = charInfos[avatarId]?.NameTextMapHash;

		return (nameHash && loc.en[nameHash]) || avatarId.toString();
	}

	private static showIcon(path?: string) {
		if (!path) return <StatIcon base="character" />;
		return <img src={`https://enka.network/ui/${path}.png`} alt="" />;
	}
	
	static async getNonCharacterProfilePhoto(id: number) {
		const profilePhotos = await EnkaImporter.getProfilePhotos();
		return EnkaImporter.showIcon(profilePhotos[id]);
	}
	
	static async getCharacterIcon(avatarId: number) {
		const [charInfos,] = await EnkaImporter.getNameResources();
		const path = charInfos[avatarId]?.SideIconName.replace('_Side', '');
		return EnkaImporter.showIcon(path);
	}

	static async getProfilePhoto(def: { avatarId?: number; id?: number; }) {
		if (def.avatarId)
			return EnkaImporter.getCharacterIcon(def.avatarId);
		
		if (def.id)
			return EnkaImporter.getNonCharacterProfilePhoto(def.id);

		return EnkaImporter.showIcon();
	}

	static async getProfile(uid: string) {
		let res;

		try {
			res = await fetch(`${import.meta.env.VITE_ENKA_PROXY}/uid/${uid}`);
		} catch {
			throw new EnkaImporterError('Could not connect to Enka.Network. Please check your internet connection.');
		}

		let data = await res.json();

		if (!res.ok)
			throw new EnkaImporterError(data?.message || `Enka.Network API error. Status code ${res.status}.`);

		let enkaBuilds: EnkaBuild[] = data?.avatarInfoList || [];
		let enkaShown: EnkaShown[] = data?.playerInfo?.showAvatarInfoList || [];
		let characterBuilds: ImportedCharacter[] = [];

		for (let i = 0; i < enkaBuilds.length; i++) {
			const build = enkaBuilds[i];

			characterBuilds.push({
				...build,
				icon: EnkaImporter.getCharacterIcon(build.avatarId),
				name: await EnkaImporter.getCharacterName(build.avatarId),
				element: energyTypeElementMap[enkaShown[i].energyType]
			});
		}

		return {
			builds: characterBuilds,
			user: {
				name: data.playerInfo.nickname,
				icon: EnkaImporter.getProfilePhoto(data.playerInfo.profilePicture)
			}
		};
	}
}
