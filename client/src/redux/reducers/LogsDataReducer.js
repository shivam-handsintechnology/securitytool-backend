import { createSlice } from "@reduxjs/toolkit";
let initialState = {
};
export const LogsData = createSlice({
    name: "LogsData",
    initialState: initialState,
    reducers: {
        setLogsData: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});
export const {
    setLogsData
} = LogsData.actions;
export default LogsData.reducer;