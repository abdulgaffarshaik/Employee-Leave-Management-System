# Employee Leave Management System (ELMS)

## Abstract
The Employee Leave Management System (ELMS) is a full-stack web application designed to automate and streamline the leave management process within an organization. The system replaces traditional manual methods with a centralized digital platform that allows employees to apply for leave online, managers to approve or reject requests, and administrators to monitor users and generate reports. The application is developed using the MERN stack and implements JWT-based authentication with role-based access control to ensure security, transparency, and efficiency.

---

## Table of Contents
- [Overview](#overview)
- [Objectives](#objectives)
- [System Design](#system-design)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation and Setup](#installation-and-setup)
- [Results](#results)
- [Conclusion](#conclusion)
- [Future Enhancements](#future-enhancements)
- [References](#references)
- [Acknowledgement](#acknowledgement)

---

## Overview
In many organizations, leave management is still handled manually using paper forms, emails, or spreadsheets. These traditional approaches often result in delays, data inconsistency, lack of transparency, and increased administrative effort.

The Employee Leave Management System (ELMS) provides a centralized, web-based solution that automates leave application, approval, and tracking. The system improves efficiency and communication between employees, managers, and administrators through role-based dashboards and secure authentication.

---

## Objectives
The main objective of this project is to develop a web-based system that simplifies and automates employee leave management.

The specific objectives are:
- To automate the employee leave application process  
- To provide a centralized platform for managing leave requests  
- To implement role-based access for Employees, Managers, and Admins  
- To enable managers to approve or reject leave requests efficiently  
- To allow employees to track and manage their leave history  
- To ensure secure authentication using JWT  
- To reduce paperwork and improve transparency  

---

## System Design

### Architecture
The system follows a client–server architecture where:
- The frontend is developed using React.js for building interactive user interfaces
- The backend is implemented using Node.js and Express.js to provide RESTful APIs
- MongoDB is used for storing user and leave-related data
- JWT (JSON Web Token) is used for authentication and role-based authorization

### Roles
- **Employee:** Apply, update, delete, and view leave history  
- **Manager:** Approve or reject employee leave requests  
- **Admin:** View users, view all leave records, and download CSV reports  

---

## Features

### Employee Module
- Secure login and registration
- Apply for leave with date range and reason
- Update or delete leave requests (if pending)
- View leave history with status and date filters

### Manager Module
- View all employee leave requests
- Approve or reject pending leave applications
- Filter leave requests by status and date

### Admin Module
- View all users and their roles
- View all leave records
- Download leave reports in CSV format

---

## Technology Stack

### Frontend
- React.js
- React Router
- Context API
- Fetch API
- CSS with Light and Dark Themes

### Backend
- Node.js
- Express.js
- JSON Web Token (JWT)

### Database
- MongoDB (Mongoose ODM)

---

## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB running locally or via cloud
- npm package manager

### Steps to Run the Project
```bash
# Clone the repository
git clone <repository-url>
cd ELMS

# Backend setup
cd backend
npm install
npm run start

# Frontend setup
cd ../frontend
npm install
npm run dev
```
---


## Results
The Employee Leave Management System (ELMS) was successfully designed and implemented as a full-stack web application. The system provides role-based dashboards for Employees, Managers, and Admins, enabling smooth leave application, approval, and monitoring processes.

Employees can apply for leave and track the status of their requests in real time. Managers can efficiently review and approve or reject leave applications, while administrators can view user details, monitor all leave records, and download reports in CSV format. The system improves efficiency, transparency, and accuracy in managing employee leave within an organization.

---

## Conclusion
The Employee Leave Management System provides an effective solution to automate and manage employee leave processes. By replacing manual and paper-based systems with a centralized digital platform, the application reduces administrative effort and improves transparency.

The use of modern web technologies such as the MERN stack and JWT-based authentication ensures secure access and reliable performance. This project demonstrates practical implementation of full-stack development concepts and can be scaled further to meet organizational requirements.

---

## Future Enhancements
- Email notifications for leave approval and rejection  
- Leave balance calculation and management  
- Mobile-responsive and mobile application support  
- Advanced analytics and reporting dashboard  
- Integration with payroll and HR management systems  

---

## References
- React.js Official Documentation – https://react.dev  
- Node.js Documentation – https://nodejs.org  
- Express.js Documentation – https://expressjs.com  
- MongoDB Documentation – https://www.mongodb.com/docs  
- JSON Web Token (JWT) – https://jwt.io  
- MDN Web Docs – https://developer.mozilla.org  
- ChatGPT by OpenAI – https://chat.openai.com  

