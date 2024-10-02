import { useEffect, useState } from "react";
import { Select, SelectItem, Image, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setLauncherSelectServerChildrenId } from "@/app/lib/slices/dashboardSlices";
import { setType } from "@/app/lib/slices/sideberSlices";
import { setServer } from "@/app/lib/slices/serverSlices";

export default function LauncherServerSidebar() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	// // const dashboardSettings = useAppSelector((state) => state.dashboardSlices);
	const serverAssetsManifest = useAppSelector((state) => state.serverSlices);
	const [serverChildrenSelect, setServerChildrenSelect] = useState<string>(serverAssetsManifest.childrens[0].id);

	useEffect(() => {
		dispatch(setLauncherSelectServerChildrenId(serverChildrenSelect));
	});

	// useEffect(() => {
	// 	// setServerChildrenSelect(server.children[0] ? [server.children[0].id] : undefined);
	// 	if (serverChildrenSelect) {
	// 		dispatch(setLauncherSelectServerChildrenId(serverChildrenSelect));
	// 	}
	// }, [serverAssetsManifest]);

	return (
		<div className="px-8 pt-5">
			<div
				className="mb-6 flex cursor-pointer items-center text-slate-200 transition hover:text-white"
				onClick={() => {
					router.push("/dashboard/launcher/server");
					dispatch(setType("Dashboard"));
					dispatch(
						setServer({
							id: "",
							name: "",
							imageUrl: "",
							description: "",
							officialWebLinkUrl: "",
							childrens: []
						})
					);
				}}
			>
				<FaAngleLeft />
				<h1 className="ml-[10px] ">返回伺服器</h1>
			</div>
			<div>
				<Image
					className="mb-3"
					src={serverAssetsManifest.imageUrl}
					alt="Server Logo"
					width={50}
					height={50}
				/>
				<h1 className="text-xl">{serverAssetsManifest.name}</h1>
			</div>

			<Select
				className="mt-6"
				label="選擇次要伺服器"
				selectedKeys={serverChildrenSelect ? [serverChildrenSelect] : undefined}
				onChange={(value) => {
					setServerChildrenSelect(value.target.value);
					dispatch(setLauncherSelectServerChildrenId(value.target.value));
				}}
			>
				{serverAssetsManifest.childrens.map((children) => (
					<SelectItem key={children.id}>{children.name}</SelectItem>
				))}
			</Select>

			<div className="mt-8">
				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push(`/dashboard/launcher/server/${serverAssetsManifest.id}/general`);
					}}
				>
					<h1 className="text-base">一般</h1>
				</div>
				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push(`/dashboard/launcher/server/${serverAssetsManifest.id}/version`);
					}}
				>
					<h1 className="text-base">發布版本</h1>
				</div>
				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push(`/dashboard/launcher/server/${serverAssetsManifest.id}/whitelist`);
					}}
				>
					<h1 className="text-base">白名單</h1>
				</div>
			</div>
		</div>
	);
}
