import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="box-border flex h-screen w-screen p-4">
			<Sidebar />
			<div className="w-full pl-10">
				<Navbar />
				<div className="">{children}</div>
			</div>
		</div>
	);
}
