# Personal Budget API

A simple personal budget API built using [Express](https://expressjs.com/). This API allows users to manage "envelopes" for budgeting purposes, including creating, reading, updating, and deleting envelopes, as well as transferring money between envelopes and extracting money.

## Features

- **CRUD Operations**: Create, read, update, and delete envelopes.
- **Money Management**: 
  - Transfer money between envelopes.
  - Extract money from envelopes.
- **Unique Identifiers**: Uses `uuid` to assign unique IDs to envelopes.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Framework for building RESTful APIs.
- **uuid**: Library to generate unique identifiers.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/danielphilip12/PersonalBudgetAPI.git
   cd personal-budget-api

2. Install Dependencies
   ```bash
   npm install
3. Start Server
   ```bash
   node index.js


## Endpoints

### Envelopes

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/envelopes`     | Retrieve all envelopes.   |
| POST   | `/envelopes`     | Create a new envelope.    |
| GET    | `/envelopes/:id` | Retrieve a specific envelope. |
| DELETE | `/envelopes/:id` | Delete an envelope.       |

### Money Management

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/envelopes/:id/extract` | Extract money from an envelope. |
| POST   | `/envelopes/transfer`    | Transfer money between two envelopes. |

  
