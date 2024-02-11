import Image from "next/image";

import ts_logo_2 from "/public/ts_logo_2.svg";
import ts_launcher from "/public/ts_launcher.svg";
import dashboard from "/public/dashboard.svg";
import { useRouter } from "next/navigation";

export default function DashboardSidebar() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-center gap-4 px-6">
				<Image
					className="py-3"
					src={ts_logo_2}
					alt="TS Logo"
					width={100}
				/>
				<h1 className="text-center text-xl subpixel-antialiased">控制中心</h1>
			</div>

			<div className="m-6 flex flex-col gap-2">
				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push("/dashboard");
					}}
				>
					<Image
						src={dashboard}
						alt="TS Launcher Logo"
						width={25}
					/>
					<h1 className="text-base">儀表板</h1>
				</div>

				<div
					className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition hover:scale-105 hover:bg-zinc-500/50 active:scale-100"
					onClick={() => {
						router.push("/dashboard/launcher/server");
					}}
				>
					<Image
						src={ts_launcher}
						alt="TS Launcher Logo"
						width={25}
					/>
					<h1 className="text-base">TS 啟動器</h1>
				</div>
			</div>
		</>
	);
}
