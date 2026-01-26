import { request } from "../../../core/api/http";

export const getUsersAPI = () => request("/admin/users");
export const getAllLeavesAPI = () => request("/admin/leaves");
export const downloadCSVAPI = () => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/admin/report/csv", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leave-report.csv";
      a.click();
    });
};

