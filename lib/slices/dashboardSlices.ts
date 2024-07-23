import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

interface IDashboardState {
    launcherSelectServerId: string;
    launcherSelectServerChildrenId: string;
}

const initialState: IDashboardState = {
    launcherSelectServerId: "",
    launcherSelectServerChildrenId: ""
};

export const dashboardSlices = createSlice({
    name: "dashboardSlices",
    initialState,
    reducers: {
        setLauncherSelectSererId: (state, action: PayloadAction<string>) => {
            state.launcherSelectServerId = action.payload;
        },
        setLauncherSelectServerChildrenId: (state, action: PayloadAction<string>) => {
            state.launcherSelectServerChildrenId = action.payload;
        }
    }
});

export const { setLauncherSelectSererId, setLauncherSelectServerChildrenId } = dashboardSlices.actions;
export default dashboardSlices.reducer;
