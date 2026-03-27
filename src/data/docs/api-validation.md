# API Validation Structure

This document describes the structure used to validate cryptocurrency API responses.

## Flow

API Request  
↓  
Fetch Service  
↓  
Zod Validation  
↓  
Global State Store (Zustand)  
↓  
UI Components

## Purpose

To ensure that API responses are validated before being used by the application components.

This prevents incorrect or unexpected data from breaking the application.