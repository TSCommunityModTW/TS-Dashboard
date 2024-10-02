import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface IDashboardState {
    socket: Socket | null;
    launcherSelectServerId: string;
    launcherSelectServerChildrenId: string;
}

const initialState: IDashboardState = {
    socket: null,
    launcherSelectServerId: "",
    launcherSelectServerChildrenId: ""
};

export const dashboardSlices = createSlice({
    name: "dashboardSlices",
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<any>) => {
            state.socket = action.payload;
        },
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
