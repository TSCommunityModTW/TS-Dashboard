"use client";

import { NextUIProvider } from "@nextui-org/react";
import StoreProvider from "./storeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		// <Provider store={store}>
		// 	<NextUIProvider>{children}</NextUIProvider>
		// </Provider>
		<StoreProvider>
			<NextUIProvider>{children}</NextUIProvider>
		</StoreProvider>
	);
}
