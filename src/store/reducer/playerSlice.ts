import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import publicAxios from "../../config/publicAxios";
interface State {
  player: Player[];
  maxPoint:number
}
interface Player {
  player: {
    id: number;
    namePlayer: string;
    point: number;
  };
}
export const getPlayer: any = createAsyncThunk("player/getPlayer", async () => {
  const data = await publicAxios.get("/api/v1/players");
  console.log("day la kieu tra ve",data.data)
  return data.data;
});

export const addPlayer: any = createAsyncThunk(
  "player/addPlayer",
  async (namePlayer) => {
    const data = await publicAxios.post("/api/v1/player", { namePlayer });
    return data.data.players;
  }
);

export const changePoint: any = createAsyncThunk(
  "player/changePoint",
  async (newPoint:any) => {
   
    const data = await publicAxios.put(`/api/v1/player/${newPoint.id}`, { check:newPoint.check });
    return data.data.players;
  }
);

const initialState: State = {
  player: [],
  maxPoint:0
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getPlayer.fulfilled, (state, action) => {
        // Add user to the state array
        state.player = action.payload.userPlayer; // gan lai cho state ban dau
        state.maxPoint = action.payload.maxPoint;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        // Add user to the state array
        state.player = action.payload;
      }).addCase(changePoint.fulfilled, (state, action) => {
        // Add user to the state array
        state.player = action.payload;
      })
  },
});

export default playerSlice.reducer;
