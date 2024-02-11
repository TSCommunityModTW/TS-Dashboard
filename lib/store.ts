import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import sideberSlices from "./slices/sideberSlices";

export const store = configureStore({
	reducer: {
		sideberSlices
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
