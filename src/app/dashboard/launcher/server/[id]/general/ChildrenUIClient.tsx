"use client";

import { Input, Button, Image, SelectItem, Select, Spinner } from "@nextui-org/react";
import { useAppSelector } from "../../../../../../../lib/hooks";
import IMinecraftVersionManifest from "../../../../../../../interfaces/IMinecraftVersionManifest";
import { useEffect, useRef, useState } from "react";
import { ActionRule, IServerChildren, MinecraftType } from "../../../../../../../lib/slices/serverSlices";

export default function ChildrenUIClient() {
	const serverAssetsManifest = useAppSelector((state) => state.serverSlices);
	const launcherSelectServerChildrenId = useAppSelector((state) => state.dashboardSlices.launcherSelectServerChildrenId);

	const [minecraftVersionManifest, setMinecraftVersionManifest] = useState<IMinecraftVersionManifest>();
	const [serveChildrenAssetsManifest, setServeChildrenAssetsManifest] = useState<IServerChildren | undefined>(
		serverAssetsManifest.children.find((children) => children.id === launcherSelectServerChildrenId)
	);

	const [imageUrl, setImageUrl] = useState<string>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.imageUrl : "");
	const [name, setName] = useState<string>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.name : "");
	const [ip, setIp] = useState<string>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.ip : "");
	const [minecraftVersion, setMinecraftVersion] = useState<string | undefined>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.minecraftVersion : "");
	const [minecraftType, setMinecraftType] = useState<MinecraftType | undefined>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.minecraftType : undefined);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const serverChildren = serverAssetsManifest.children.find((children) => children.id === launcherSelectServerChildrenId);
		if (serverChildren) {
			setImageUrl(serverChildren.imageUrl);
			setName(serverChildren.name);
			setIp(serverChildren.ip);
			setMinecraftVersion(serverChildren.minecraftVersion);
			setMinecraftType(serverChildren.minecraftType);
		}

		setServeChildrenAssetsManifest(serverChildren);
	}, [launcherSelectServerChildrenId]);

	const fetchData = async () => {
		setMinecraftVersionManifest(await getMinecraftVersionManifest());
	};

	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImageUrl(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};
	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<>
			<div className="container">
				<h1 className="mb-[10px] text-lg">子伺服器資訊</h1>
				<div className="flex items-center justify-center space-x-[30px]">
					<div className="flex w-[400px] flex-col items-center justify-center rounded-lg bg-content1 px-[20px] py-[20px]">
						<Image
							className="mb-[20px]"
							src={imageUrl}
							alt="Server Logo"
						/>
						<Button
							className="w-[250px]"
							onClick={handleButtonClick}
						>
							更改圖片
						</Button>
						<input
							type="file"
							id="formId"
							hidden
							ref={fileInputRef}
							onChange={handleFile}
						/>
					</div>
					<div className="w-full space-y-[10px]">
						<Input
							label="名稱"
							value={name}
							// placeholder="子伺服器名稱"
							onChange={(value) => {
								setName(value.target.value);
							}}
						/>
						<Input
							label="IP 位址"
							value={ip}
							// placeholder="伺服器 IP 位址"
							onChange={(value) => {
								setIp(value.target.value);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="container my-[30px]">
				<div className="flex items-center justify-center space-x-[10px]">
					{minecraftVersionManifest ? (
						<Select
							label="Minecraft 版本"
							selectedKeys={minecraftVersion ? [minecraftVersion] : undefined}
							onChange={(value) => {
								setMinecraftVersion(value.target.value);
							}}
						>
							{minecraftVersionManifest.versions
								.filter((version) => version.type === "release")
								.map((version) => (
									<SelectItem key={version.id}>{version.id}</SelectItem>
								))}
						</Select>
					) : (
						<Spinner />
					)}
					<Select
						label="Minecraft 啟動類型"
						selectedKeys={minecraftType ? [minecraftType] : undefined}
						onChange={(value) => {
							setMinecraftType(value.target.value as MinecraftType);
						}}
					>
						<SelectItem key="VANILLA">Vanilla</SelectItem>
						<SelectItem key="MODPACK">Modpack</SelectItem>
					</Select>
				</div>
			</div>
		</>
	);
}

async function getMinecraftVersionManifest(): Promise<IMinecraftVersionManifest> {
	const res = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
