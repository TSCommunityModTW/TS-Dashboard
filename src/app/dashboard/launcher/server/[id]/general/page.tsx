import { Input, Button, Divider, Image } from "@nextui-org/react";
import IMinecraftVersionManifest from "../../../../../../../interfaces/IMinecraftVersionManifest";
import SelectUIClient from "./SelectUIClient";

export default async function General() {
	const minecraftVersionManifest = await getMinecraftVersionManifest();

	return (
		<div className="flex flex-col items-center justify-start p-8">
			<div className="container">
				<h1 className="mb-[10px] text-lg">伺服器資訊</h1>
				<div className="flex items-center justify-center space-x-[30px]">
					<div className="flex flex-col items-center justify-center rounded-lg bg-content1 px-[20px] py-[10px]">
						<Image
							className="mb-[10px]"
							src={"https://github.com/NamelessRealms/mckismetlab-launcher/blob/react-v0.4.x-beta/src/assets/images/logo/logo.png?raw=true"}
							alt="Server Logo"
							width={150}
							height={150}
						/>
						<Button>上傳圖片</Button>
					</div>
					<div className="w-full space-y-[10px]">
						<Input
							label="名稱"
							placeholder="伺服器名稱"
						/>
						<Input
							label="描述"
							placeholder="伺服器描述"
						/>
						<Input
							label="官網網址"
							placeholder="伺服器官網網址"
						/>
					</div>
				</div>
			</div>
			<Divider className="container my-8" />
			<div className="container">
				<h1 className="mb-[10px] text-lg">子伺服器資訊</h1>
				<div className="flex items-center justify-center space-x-[30px]">
					<div className="flex w-[400px] flex-col items-center justify-center rounded-lg bg-content1 px-[20px] py-[20px]">
						<Image
							className="mb-[20px]"
							src={"https://i.ibb.co/yYwrRf0/dawncraft-cf.png"}
							alt="Server Logo"
						/>
						<Button className="w-[250px]">上傳圖片</Button>
					</div>
					<div className="w-full space-y-[10px]">
						<Input
							label="名稱"
							placeholder="子伺服器名稱"
						/>
						<Input
							label="IP 位址"
							placeholder="伺服器 IP 位址"
						/>
					</div>
				</div>
			</div>
			<div className="container my-[30px]">
				<div className="flex items-center justify-center space-x-[10px]">
					<SelectUIClient minecraftVersionManifest={minecraftVersionManifest} />
				</div>
			</div>
		</div>
	);
}

async function getMinecraftVersionManifest(): Promise<IMinecraftVersionManifest> {
	const res = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
