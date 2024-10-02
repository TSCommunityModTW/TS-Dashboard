import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export type MinecraftType = "MODPACK" | "VANILLA";
export type ActionRule = "ALL" | "WHITELIST" | "BLACKLIST";

export interface IServerChildren {
    id: string;
    ip: string;
    name: string;
    imageUrl: string;
    minecraftType: MinecraftType;
    minecraftVersion: string;
    action: {
        rule: ActionRule;
        players: Array<{
            id: string;
            uuid: string;
        }>
    },
    assets: {
        version: string;
    }
}

export interface IServerState {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    officialWebLinkUrl: string;
    childrens: Array<IServerChildren>
}

const initialState: IServerState = {
    id: "",
    name: "",
    imageUrl: "",
    description: "",
    officialWebLinkUrl: "",
    childrens: []
}

export const serverSlices = createSlice({
    name: "serverSlices",
    initialState,
    reducers: {
        setServer: (state, action: PayloadAction<IServerState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.imageUrl = action.payload.imageUrl;
            state.description = action.payload.description;
            state.officialWebLinkUrl = action.payload.officialWebLinkUrl;
            state.childrens = action.payload.childrens;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setOfficialWebLinkUrl: (state, action: PayloadAction<string>) => {
            state.officialWebLinkUrl = action.payload;
        },
        setChildrens: (state, action: PayloadAction<Array<IServerChildren>>) => {
            state.childrens = action.payload;
        },
        setChildren: (state, action: PayloadAction<{ id: string, data: IServerChildren }>) => {
            state.childrens = state.childrens.map(children => {
                if (children.id === action.payload.id) children = action.payload.data;
                return children;
            })
        }
    }
});

export const { setServer, setId, setName, setImageUrl, setDescription, setOfficialWebLinkUrl, setChildrens, setChildren } = serverSlices.actions;
export default serverSlices.reducer;
