# Full Stack Application Setup Guide

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020-brightgreen)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D%204.3.0-blue)](https://npmpkg.com/)
[![Express](https://img.shields.io/badge/Express-4.21.1-green)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-3.11.3-orange)](https://www.mysql.com/)

A robust full-stack application developed as part of 6COSC022W Coursework 1 by Saumya Kumarasinghe. This system includes an API-driven backend built with Node.js + Express and a Next.js (React) frontend. It provides secure role-based access, API key management, and global country data exploration features.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Quick Start (Using Docker)](#quick-start-using-docker)
- [Manual Setup (Without Docker)](#manual-setup-without-docker)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Files](#environment-files)
  - [Server Environment Files](#server-environment-files)
  - [Client Environment Files](#client-environment-files)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Available Scripts](#available-scripts)
  - [Server Scripts](#server-scripts)
  - [Client Scripts](#client-scripts)
- [Common Issues & Solutions](#common-issues--solutions)
- [For Your Viva](#for-your-viva)
- [License](#license)

## Overview

This full-stack project serves as a centralized platform to view global country information and manage users and API keys with administrative controls. The frontend is powered by Next.js and connects securely to a backend API, which enforces authentication and data access rules.

## Features

- RESTful API design
- SQLite database integration with migration support
- Authentication and authorization
- API protection
- Comprehensive testing (endpoint testing)
- Hooks

## Prerequisites

- Node.js v18 or higher
- Docker and Docker Compose installed
- Git installed

## Project Structure

```
├── client/          # Next.js frontend
└── server/          # Node.js backend API
```

## Quick Start (Using Docker)

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd 6COSC022W-w1810569-20191250
   ```

2. Start the application using Docker:

   ```bash
   docker:build
   docker:up
   ```

3. Access the application:
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:8000/api-docs (in development mode)

## Manual Setup (Without Docker)

### Backend Setup

1. Navigate to server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run database migrations:

   ```bash
   npm run migrate
   ```

4. Start the server:
   - Development mode: `npm run start:dev`
   - Production mode: `npm run start:prod`
   - Test mode: `npm run start:test`

### Frontend Setup

1. Navigate to client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:
   - Development: `npm run dev`
   - Production: `npm run build && npm start`

## API Documentation

- When running in development mode, access Swagger documentation at: http://localhost:8000/api-docs
- API endpoints are versioned (v1, v2)

## Database

- SQLite database is used
- Location: `server/database/database.db`
- Test database: `server/database/test_database.db`

## Common Issues & Solutions

1. Port Already in Use:

   - Change the port in docker-compose.yml or environment files
   - Default ports: Backend (8000), Frontend (3000)

2. Database Issues:

   - Ensure migrations are run: `cd server && npm run migrate`
   - Check database file permissions

3. Environment Variables:
   - Make sure all required environment files are present
   - Check environment variable values match your setup

## License

This project is proprietary software owned by Saumya Kumarasinghe. Unauthorized use, copying, modification, or distribution of this software is strictly prohibited.
