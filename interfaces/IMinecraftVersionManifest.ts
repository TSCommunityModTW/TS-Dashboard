export default interface IMojangManifestVersion {
	latest: {
		release: string;
		snapshot: string;
	};
	versions: Array<IManifestVersion>;
}

export interface IManifestVersion {
	id: string;
	type: string;
	url: string;
	time: string;
	releaseTime: string;
}
