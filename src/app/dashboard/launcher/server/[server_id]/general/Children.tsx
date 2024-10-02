"use client";

import { Input, Button, Image, SelectItem, Select, Spinner } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../../../lib/hooks";
import IMinecraftVersionManifest from "../../../../../../../interfaces/IMinecraftVersionManifest";
import { useEffect, useRef, useState } from "react";
import { IServerChildren, MinecraftType, setChildren } from "../../../../../lib/slices/serverSlices";
import { config } from "@/config/config";

interface IProps {
	server_Id: string;
}

export default function ChildrenUIClient(props: IProps) {
	const dispatch = useAppDispatch();
	const serverAssetsManifest = useAppSelector((state) => state.serverSlices);
	const launcherSelectServerChildrenId = useAppSelector((state) => state.dashboardSlices.launcherSelectServerChildrenId);

	const [minecraftVersionManifest, setMinecraftVersionManifest] = useState<IMinecraftVersionManifest>();
	const [serveChildrenAssetsManifest, setServeChildrenAssetsManifest] = useState<IServerChildren | undefined>(
		serverAssetsManifest.childrens.find((children) => children.id === launcherSelectServerChildrenId)
	);

	const [imageUrl, setImageUrl] = useState<string>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.imageUrl : "");
	const [name, setName] = useState<string>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.name : "");
	const [ip, setIp] = useState<string>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.ip : "");
	const [minecraftVersion, setMinecraftVersion] = useState<string>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.minecraftVersion : "");
	const [minecraftType, setMinecraftType] = useState<MinecraftType | undefined>(serveChildrenAssetsManifest ? serveChildrenAssetsManifest.minecraftType : undefined);

	const [updateDataSpinner, setUpdateDataSpinner] = useState<boolean>(false);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const serverChildren = serverAssetsManifest.childrens.find((children) => children.id === launcherSelectServerChildrenId);
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

	const updateData = async () => {
		if (!serveChildrenAssetsManifest || !minecraftType) {
			return;
		}

		setUpdateDataSpinner(true);

		dispatch(
			setChildren({
				id: serveChildrenAssetsManifest.id,
				data: {
					id: serveChildrenAssetsManifest.id,
					ip,
					name,
					imageUrl,
					minecraftType,
					minecraftVersion,
					action: {
						// TODO
						rule: "ALL",
						players: []
					},
					assets: {
						version: "" // TODO
					}
				}
			})
		);

		const formData = new FormData();
		formData.append("server_id", props.server_Id);
		formData.append("id", serveChildrenAssetsManifest.id);
		formData.append("ip", ip);
		formData.append("name", name);
		formData.append("image_url", imageUrl);
		formData.append("minecraft_type", minecraftType);
		formData.append("minecraft_version", minecraftVersion);
		formData.append("action_rule", "ALL"); // TODO

		const response = await fetch(`${config.API_LOCATION}/launcher/assets/servers/${props.server_Id}/childrens/${serveChildrenAssetsManifest.id}`, {
			method: "PATCH",
			body: formData
		});

		if (response.status === 201 || response.status === 304) {
			setUpdateDataSpinner(false);
		} else {
			console.error("Error updating data: " + response.status);
		}
	};

	return (
		<div className="container">
			<h1 className="mb-[10px] text-lg">資訊</h1>
			<div className="flex items-center justify-center space-x-[30px]">
				<div className="flex flex-col items-center justify-center rounded-lg bg-content1 px-[20px] py-[20px]">
					<Image
						className="mb-[20px]"
						src={imageUrl}
						alt="Server Logo"
						width={300}
					/>
					<Button
						className="w-[200px]"
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
			<div className="mt-[20px] flex items-center justify-start">
				<Button
					className="caret-zinc-50"
					color="primary"
					isLoading={updateDataSpinner}
					onClick={updateData}
				>
					儲存
				</Button>
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
