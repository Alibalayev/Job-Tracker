import api from "./api";
import type { Job } from "../types/job";

export const getJobs = () => {
    return api.get<Job[]>("/jobs");
};

export const createJob = (job: Omit<Job, "id" | "createdAt">) => {
    return api.post<Job>("/jobs", job);
};

export const updateJob = (id: string, job: Partial<Job>) => {
    return api.put<Job>(`/jobs/${id}`, job);
};

export const deleteJob = (id: string) => {
    return api.delete(`/jobs/${id}`);
};
