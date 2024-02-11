"use client";

import { Select, SelectItem } from "@nextui-org/react";
import IMinecraftVersionManifest from "../../../../../../../interfaces/IMinecraftVersionManifest";

type IProps = {
	minecraftVersionManifest: IMinecraftVersionManifest;
};

export default function SelectUIClient(props: IProps) {
	const minecraftReleaseVersions = () => {
		return props.minecraftVersionManifest.versions.filter((version) => version.type === "release");
	};

	return (
		<>
			<Select label="Minecraft 版本">
				{minecraftReleaseVersions().map((version) => (
					<SelectItem
						key={version.id}
						value={version.id}
					>
						{version.id}
					</SelectItem>
				))}
			</Select>
			<Select label="Minecraft 啟動類型">
				<SelectItem
					key="vanilla"
					value="vanilla"
				>
					Vanilla
				</SelectItem>
				<SelectItem
					key="modpack"
					value="modpack"
				>
					Modpack
				</SelectItem>
			</Select>
		</>
	);
}
