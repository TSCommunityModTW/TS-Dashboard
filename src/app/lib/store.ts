import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import sideberSlices from "./slices/sideberSlices";
import serverSlices from "./slices/serverSlices";
import dashboardSlices from "./slices/dashboardSlices";

export const store = () => {
	return configureStore({
		reducer: {
			sideberSlices,
			serverSlices,
			dashboardSlices
		}
	});
};

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;