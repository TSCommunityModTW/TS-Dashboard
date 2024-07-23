"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../../../../lib/hooks";
import { setType } from "../../../../../../lib/slices/sideberSlices";
import { useEffect } from "react";
import { setServer } from "../../../../../../lib/slices/serverSlices";
import { Spinner } from "@nextui-org/react";

export default function LauncherServer({ params }: { params: { id: string } }) {
	const serverId = params.id;
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const serverData = await (await fetch(`http://localhost:8030/launcher/assets/servers/${serverId}`)).json();
		const serverChildrenData = await (await fetch(`http://localhost:8030/launcher/assets/servers/${serverId}/childrens`)).json();

		dispatch(
			setServer({
				id: serverData.id,
				name: serverData.name,
				imageUrl: serverData.image_url,
				description: serverData.description,
				officialWebLinkUrl: serverData.official_web_link_url,
				children: serverChildrenData.map((children: any) => ({
					id: children.id,
					ip: children.ip,
					name: children.name,
					imageUrl: children.image_url,
					minecraftType: children.minecraft_type,
					minecraftVersion: children.minecraft_version
					// action: {}
				}))
			})
		);

		dispatch(setType("LauncherServer"));
		router.push(`/dashboard/launcher/server/${serverId}/general`);
	};

	return <Spinner />;
}
