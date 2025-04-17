# Full Stack Application Setup Guide

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020-brightgreen)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-%3E%3D%204.3.0-blue)](https://npmpkg.com/)
[![Express](https://img.shields.io/badge/Express-4.21.1-green)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-3.11.3-orange)](https://www.mysql.com/)

A robust Node.js Express server-side application serving as the 6COSC022W-Coursework-1-w1810569-20191250 Backend-for-Frontend (BFF) system.

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

Add a brief description of the project here.

## Features

- RESTful API design
- SQLite database integration with migration support
- Authentication and authorization
- API protection
- Comprehensive testing suite (unit and E2E)
- CI/CD pipelines for multiple environments

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
   docker-compose up --build
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

## Environment Files

Each part of the application (server and client) has its own environment files:

### Server Environment Files

- `.env.dev` - Development environment variables
- `.env.test` - Testing environment variables
- `.env.prod` - Production environment variables

### Client Environment Files

- `.env.local` - Local environment variables
- `.env.production` - Production environment variables

## API Documentation

- When running in development mode, access Swagger documentation at: http://localhost:8000/api-docs
- API endpoints are versioned (v1, v2)

## Database

- SQLite database is used
- Location: `server/database/database.db`
- Test database: `server/database/test_database.db`

## Available Scripts

### Server Scripts

- `npm run start:dev` - Start server in development mode
- `npm run start:test` - Start server in test mode
- `npm run start:prod` - Start server in production mode
- `npm run migrate` - Run database migrations
- `npm run seed:all` - Run database seeders

### Client Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server

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

## For Your Viva

1. Clone your repository
2. Choose either Docker or Manual setup method
3. Ensure all environment files are properly configured
4. Start the application
5. Verify both frontend and backend are running
6. Access API documentation to show available endpoints

## License

This project is proprietary software owned by Saumya Kumarasinghe. Unauthorized use, copying, modification, or distribution of this software is strictly prohibited.
