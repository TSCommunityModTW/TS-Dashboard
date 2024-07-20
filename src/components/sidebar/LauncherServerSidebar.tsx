import { useAppDispatch } from "../../../lib/hooks";
import { setType } from "../../../lib/slices/sideberSlices";
import { Select, SelectItem, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LauncherServerSidebar() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const server = {
		id: "namelessrealms",
		name: "Nameless Realms",
		logoUrl: "https://github.com/NamelessRealms/mckismetlab-launcher/blob/react-v0.4.x-beta/src/assets/images/logo/logo.png?raw=true",
		children: [
			{
				id: "namelessrealms-1",
				name: "主要伺服器"
			},
			{
				id: "namelessrealms-2",
				name: "次服務器"
			},
			{
				id: "namelessrealms-3",
				name: "測試服"
			}
		]
	};

	return (
		<div className="px-8 pt-5">
			<h1
				className="mb-6 cursor-pointer text-slate-200 transition hover:text-white"
				onClick={() => {
					router.push("/dashboard/launcher/server");
					dispatch(setType("Dashboard"));
				}}
			>
				返回伺服器
			</h1>
			<div>
				<Image
					className="mb-3"
					src={server.logoUrl}
					alt="Server Logo"
					width={50}
					height={50}
				/>
				<h1 className="text-xl">{server.name}</h1>
			</div>

			<Select
				className="mt-6"
				label="選擇次要伺服器"
				defaultSelectedKeys={[server.children[0].id]}
			>
				{server.children.map((children) => (
					<SelectItem
						key={children.id}
						value={children.id}
					>
						{children.name}
					</SelectItem>
				))}
			</Select>

			<div className="mt-8">
				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push(`/dashboard/launcher/server/${server.id}/general`);
					}}
				>
					<h1 className="text-base">一般</h1>
				</div>
				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push(`/dashboard/launcher/server/${server.id}/version`);
					}}
				>
					<h1 className="text-base">發布版本</h1>
				</div>
				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push(`/dashboard/launcher/server/${server.id}/whitelist`);
					}}
				>
					<h1 className="text-base">白名單</h1>
				</div>
			</div>
		</div>
	);
}
