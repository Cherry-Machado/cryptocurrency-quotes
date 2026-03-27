# API Testing – Cryptocurrency Data

This document records the verification of the cryptocurrency API used in the project.

## API Endpoint
https://api.coincap.io/v2/assets

## Testing Tool
Postman

## Verification Results
The API returned valid cryptocurrency data including:

- id
- name
- symbol
- priceUsd

The response structure was confirmed to be usable for populating the cryptocurrency dropdown in the application.

## Notes
The API connection works correctly and returns data in JSON format.