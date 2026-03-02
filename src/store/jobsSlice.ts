import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "../types/job";

interface JobsState {
    jobs: Job[];
}

const initialState: JobsState = {
    jobs: []
}

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<Job>) => {
            state.jobs.push(action.payload)
        },
        deleteJob: (state, action: PayloadAction<string>) => {
            state.jobs = state.jobs.filter(job => job.id !== action.payload)
        },
        updateJob: (state, action: PayloadAction<Job>) => {
            state.jobs = state.jobs.map(job => job.id === action.payload.id ? action.payload : job)
        }
    }
})

export const { addJob, deleteJob, updateJob } = jobsSlice.actions
export default jobsSlice.reducer