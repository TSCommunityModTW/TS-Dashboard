import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";

import { Providers } from "./providers";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TS Dashboard",
	description: "TS Community Mod Server Dashboard"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className="dark"
		>
			<body className={inter.className}>
				<Providers>
					<div className="box-border flex h-screen w-screen p-4">
						<Sidebar />
						<div className="w-full pl-10">
							<Navbar />
							<div className="">{children}</div>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
