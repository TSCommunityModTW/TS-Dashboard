"use client";

import Image from "next/image";
import { Button, Card, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LauncherServer() {
	const router = useRouter();
	const [servers, setServers] = useState<Array<{ id: string; name: string; logoUrl: string }>>([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const servers = await (await fetch("http://localhost:8030/launcher/assets/servers")).json();
		setServers(
			servers.map((data: any) => {
				return {
					id: data.id,
					name: data.name,
					logoUrl: data.image_url
				};
			})
		);
	};

	return (
		<div className="px-5 py-10">
			<h1 className="text-2xl">伺服器</h1>

			<div className="flex flex-wrap gap-10 pt-5">
				{servers.map((server) => (
					<Card
						key={server.id}
						isFooterBlurred
						radius="lg"
						className="h-[250px] w-[250px] border-none bg-gray-950/50"
					>
						<div className="flex items-center justify-center p-3">
							<Image
								className="object-cover"
								width={180}
								height={180}
								src={server.logoUrl}
								alt="server logo"
							/>
						</div>
						<CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
							<p className="text-tiny text-white/80">{server.name}</p>
							<Button
								className="bg-white/20 text-tiny text-white"
								variant="flat"
								color="default"
								radius="lg"
								size="sm"
								onClick={() => {
									router.push(`/dashboard/launcher/server/${server.id}`);
								}}
							>
								管理
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
