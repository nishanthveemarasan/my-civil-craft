import { serviceData, serviceStoreData, testimonialData, TestimonialStoreData } from "@/types/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchServicesData } from "../reducer/actionReducer";

const intitalState: serviceStoreData = { 
    data:[],
    loading: false,
    error: false
}

const serviceSlice = createSlice({
    name: "service",
    initialState: intitalState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchServicesData.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchServicesData.fulfilled, (state, action: PayloadAction<serviceData[]>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = false;
        })
        .addCase(fetchServicesData.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }
});

export default serviceSlice;
