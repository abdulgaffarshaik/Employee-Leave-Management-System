import { request } from "../../../core/api/http";

export const getAllLeavesAPI = (params = "") =>
  request(`/manager/leaves${params}`);

export const approveLeaveAPI = (id) =>
  request(`/manager/approve/${id}`, { method: "PUT" });

export const rejectLeaveAPI = (id) =>
  request(`/manager/reject/${id}`, { method: "PUT" });
