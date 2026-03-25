# 📝 Work Item Tracking App

A full-stack Work Item Tracking application built as part of a take-home assessment.  
The goal of this project is to demonstrate clean architecture, API design, and frontend-backend integration — not production readiness.

---

## 🚀 Tech Stack

### Backend

- ASP.NET Core Web API
- Clean Architecture (Domain, Application, Infrastructure, API)
- In-memory persistence
- xUnit (unit testing)

### Frontend

- Next.js (App Router)
- React (functional components & hooks)
- Tailwind CSS
- Jest + React Testing Library

---

## 📦 Features

### Work Item Management

- Create a work item
- View all work items
- View a single work item
- Update a work item
- Delete a work item

### Additional Functionality

- Filter work items (by status)
- Sort work items (by date/title)
- Work item summary view
- Loading and empty states

### Authentication (Simulated)

- Frontend sends a mock token in request headers
- Backend validates token presence via middleware

---

## 🧱 Architecture

The backend follows a Clean Architecture approach:

/src
├── Domain # Core business entities
├── Application # Use cases, DTOs, interfaces
├── Infrastructure # In-memory data storage
├── API # Controllers, middleware, configuration

### Key Design Decisions

- In-memory database used for simplicity and per requirements
- Separation of concerns using layered architecture
- Centralized error handling via middleware
- Lightweight validation at API level

---

## ⚙️ Getting Started

### ✅ Prerequisites

Make sure you have installed:

- .NET 8 SDK
- Node.js (v18 or higher)
- npm or yarn

---

## 📥 1. Clone the Repository

```bash
git clone https://github.com/pfano-dev/Tracking-App
cd Tracking-App
```

## 🖥️ 2. Run the Backend (ASP.NET Core)

```bash
cd Tracking-App-Backend
dotnet restore
dotnet run

Backend will run on:

https://localhost:7099

```

## 🌐 3. Run the Frontend (Next.js)

```bash

cd tracking-app-ui
npm install
npm run dev

Frontend will run on:

http://localhost:3000

```

## 🔗 API Base URL

The frontend expects the backend to run on:

https://localhost:7099/api/v1/work-items

## 🧪 Running Tests

### Backend (xUnit)

```bash

cd backend
dotnet test
```

### Frontend (Jest)

```bash

cd tracking-app-ui
npm run test
```

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | /api/v1/work-items      | Get all work items   |
| GET    | /api/v1/work-items/{id} | Get single work item |
| POST   | /api/v1/work-items      | Create work item     |
| PUT    | /api/v1/work-items/{id} | Update work item     |
| DELETE | /api/v1/work-items/{id} | Delete work item     |

## 🔄 Data Persistence

Uses in-memory storage
Data resets when the backend restarts
This is intentional per assessment requirements

## 📖 Notes

This project focuses on clean structure and maintainability
Designed to be easy to understand and run locally
Not intended for production use

## ✅ Status

✔ Backend API running
✔ Frontend connected to backend
✔ CRUD operations working
✔ Filtering & sorting implemented
✔ Unit tests included

## 👨‍💻 Author

Pfano Muleya
