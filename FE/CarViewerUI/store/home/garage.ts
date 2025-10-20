import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STORE_KEYS } from "../../constants/slices";
import { Garage } from "../../types/home/garage/garage";

interface GarageState {
  items: Garage[];
}

const initialState: GarageState = {
  items: [
    { id: "1", name: "Hlavná garáž", carCount: 3, imageUrl: "", ownerId: "user1", isShared: false },
    { id: "2", name: "Letná garáž", carCount: 2, imageUrl: "", ownerId: "user1", isShared: false },
    { id: "3", name: "Zdieľaná garáž", carCount: 5, imageUrl: "", ownerId: "user2", isShared: true },
  ],
};

const garageSlice = createSlice({
  name: STORE_KEYS.GARAGE,
  initialState,
  reducers: {
    addGarage: (state, action: PayloadAction<Garage>) => {
      state.items.push(action.payload);
    },
    removeGarage: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((g) => g.id !== action.payload);
    },
    updateGarage: (state, action: PayloadAction<Garage>) => {
      const index = state.items.findIndex((g) => g.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
  },
});

export const { addGarage, removeGarage, updateGarage } = garageSlice.actions;
export const selectGarages = (state: any) => state.garage.items;
export default garageSlice.reducer;
