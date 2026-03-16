import { request } from "../../../core/api/http";

export const getAllLeavesAPI = (query = "") =>
  request(`/manager/leaves${query}`);

export const approveLeaveAPI = (id) =>
  request(`/manager/approve/${id}`, { method: "PUT" });

export const rejectLeaveAPI = (id) =>
  request(`/manager/reject/${id}`, { method: "PUT" });
