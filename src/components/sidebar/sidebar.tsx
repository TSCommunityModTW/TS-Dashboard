"use client";

import { useAppSelector } from "../../../lib/hooks";
import DashboardSidebar from "./DashboardSidebar";
import LauncherServerSidebar from "./LauncherServerSidebar";

export default function Sidebar() {
	const sidebarType = useAppSelector((state) => state.sideberSlices.type);
	return <div className="w-[350px] rounded-lg bg-content1 pt-4 shadow-2xl">{sidebarType === "Dashboard" ? <DashboardSidebar /> : <LauncherServerSidebar />}</div>;
}
