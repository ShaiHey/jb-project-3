import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";
import Like from "../models/like/Like";

interface VacationsState {
    vacations: Vacation[]
}

const initialState: VacationsState = {
    vacations: []
}

export const vacationsSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload
        },
        addVacation: (state, action: PayloadAction<Vacation>) => {
            state.vacations = [action.payload, ...state.vacations]
        },
        removeVacation: (state, action: PayloadAction<{id: string}>) => {
            state.vacations = state.vacations.filter(v => v.id !== action.payload.id)
        },
        updateVacation: (state, action: PayloadAction<Vacation>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id);
            if(index > -1) {
                state.vacations[index] = action.payload
            }
        },
        addLike: (state, action: PayloadAction<Like>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.vacationId);
            if(index > -1) {
                state.vacations[index].likes.push(action.payload)
            }
        },
        removeLike: (state, action: PayloadAction<{ vacationId: string, userId: string }>) => {
            const vacation = state.vacations.find(v => v.id === action.payload.vacationId);
            
            if (vacation) {
                vacation.likes = vacation.likes.filter(l => l.likerId !== action.payload.userId);
            }
        }        
    }
})

export const { init, addVacation, removeVacation, updateVacation, addLike, removeLike } = vacationsSlice.actions;

export default vacationsSlice.reducer;