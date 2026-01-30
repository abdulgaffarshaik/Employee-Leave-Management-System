import { request } from "../../../core/api/http";

export const applyLeaveAPI = (data) =>
  request("/employee/apply", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const getMyLeavesAPI = (params = "") =>
  request(`/employee/my-leaves${params}`);

export const updateLeaveAPI = (id, data) =>
  request(`/employee/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const deleteLeaveAPI = (id) =>
  request(`/employee/delete/${id}`, {
    method: "DELETE"
  });

export const getEmployeesAPI = () =>
  request("/employee/list");

export const getNotificationsAPI = () =>
  request("/notification");
