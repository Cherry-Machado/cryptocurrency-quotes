# Currency and Cryptocurrency State Design

This document describes the state flow used for the currency quote feature.

## Flow

User selects currency  
↓  
User selects cryptocurrency  
↓  
Application updates state  
↓  
API request is sent  
↓  
Response is validated  
↓  
Quote result is displayed to the user

## Purpose

The goal of this design is to separate the state logic from the UI components and ensure that the application always displays validated data.