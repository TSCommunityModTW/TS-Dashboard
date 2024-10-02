import { config } from "@/config/config";
import ServerCard from "./ServerCard";

export default async function LauncherServer() {
	const response = await fetch(`${config.API_LOCATION}/launcher/assets/servers`);
	const serversData: Array<IAssetsServer> = await response.json();
	return (
		<div className="px-5 py-10">
			<h1 className="text-2xl">伺服器</h1>
			<div className="flex flex-wrap gap-10 pt-5">
				<ServerCard data={serversData} />
			</div>
		</div>
	);
}

export interface IAssetsServer {
	id: string;
	name: string;
	image_url: string;
	description: string;
	official_web_link_url: string;
}
