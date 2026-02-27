import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slice/contact-slice";
import testimonialSlice from "./slice/testimonial-slice";
import serviceSlice from "./slice/service-slice";

 const store = configureStore({
    reducer: {
        contactStore: contactSlice.reducer,
        testimonialStore: testimonialSlice.reducer,
        serviceStore: serviceSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const contactStoreActions = contactSlice.actions;
export const testimonialStoreActions = testimonialSlice.actions;
export const serviceStoreActions = serviceSlice.actions;

export default store;