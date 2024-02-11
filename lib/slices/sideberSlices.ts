import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

type SideberType = "Dashboard" | "LauncherServer";

interface ISideberSlices {
	type: SideberType;
}

const initialState: ISideberSlices = {
	type: "Dashboard"
};

export const sideberSlices = createSlice({
	name: "sideberSlices",
	initialState,
	reducers: {
		setType: (state, action: PayloadAction<SideberType>) => {
			state.type = action.payload;
		}
	}
});

export const { setType } = sideberSlices.actions;
export default sideberSlices.reducer;
