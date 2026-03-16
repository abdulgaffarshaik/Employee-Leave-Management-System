import { request } from "../../../core/api/http";

// Manager operations
export const createTimetableAPI = (data) =>
  request("/timetable", { method: "POST", body: JSON.stringify(data) });

export const getAllTimetablesAPI = (query = "") =>
  request(`/timetable${query}`);

export const getTimetableAPI = (id) =>
  request(`/timetable/${id}`);

export const updateTimetableAPI = (id, data) =>
  request(`/timetable/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteTimetableAPI = (id) =>
  request(`/timetable/${id}`, { method: "DELETE" });

// Employee view
export const getTimetableByClassSectionAPI = (className, section) =>
  request(`/timetable/view/${className}/${section}`);
