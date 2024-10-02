import { NextUIProvider } from "@nextui-org/react";
import StoreProvider from "./storeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
	// async function initSocket() {
	// 	const authBody = new FormData();
	// 	authBody.append("grant_type", "token");
	// 	authBody.append("token", process.env.SOCKET_TOKEN!);
	// 	const socketAuth = await (
	// 		await fetch(`${config.API_LOCATION}/oauth2/token`, {
	// 			method: "POST",
	// 			body: authBody
	// 		})
	// 	).json();

	// 	// SocketIo.init(socketAuth.access_token, process.env.SOCKET_SECRET!);
	// 	// SocketIo.socket().on("connect", () => console.log("Socket connected."));
	// 	// SocketIo.socket().connect();
	// }

	return (
		<StoreProvider>
			<NextUIProvider>{children}</NextUIProvider>
		</StoreProvider>
	);
}
