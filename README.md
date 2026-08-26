<img width="1453" height="788" alt="Bildschirmfoto 2026-08-26 um 21 50 48" src="https://github.com/user-attachments/assets/3ce46d5d-7386-471b-a326-f01942be224f" />



<img width="1451" height="734" alt="Bildschirmfoto 2026-08-26 um 21 51 11" src="https://github.com/user-attachments/assets/b18b406c-1ac7-4226-a4cd-cd2edf30fcca" />



# Next.js Ecommerce Shop Project

This full-stack Next.js e-commerce application was built as part of the UpLeveled Full Stack Course to practice end-to-end web development—from database schema design to automated testing and deployment.

## Technologies

* **Framework:** Next.js
* **Database:** PostgreSQL
* **Styling:** SCSS
* **Testing:** Jest & Playwright
* **Hosting:** Fly.io

---

## Database Setup

If you haven't installed PostgreSQL yet, follow the setup instructions in the [UpLeveled System Setup Guide](https://github.com).

### 1. Environment Variables
Duplicate `.env.example` and rename it to `.env` (this file is excluded from Git):
```bash
cp .env.example .env
```
Fill in your local connection credentials and secret keys inside `.env`.

### 2. Connect to PostgreSQL as Administrator
Open your terminal and launch `psql` as the administrator user:

* **Windows:**
  ```bash
  psql -U postgres
  ```
  *(Enter `postgres` if prompted for a password.)*

* **macOS:**
  ```bash
  psql postgres
  ```

* **Linux:**
  ```bash
  sudo -u postgres psql
  ```

### 3. Provision Database, User, and Schema
Execute the following SQL commands sequentially inside the `psql` shell:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
\connect <database name>
CREATE SCHEMA <schema name> AUTHORIZATION <user name>;
```

Exit `psql` using:
```sql
\q
```

### 4. Linux OS User Setup *(Optional / Best Practice)*
On Linux systems, it is best practice to create a dedicated system user for each database to keep system resources isolated. Note that system passwords cannot contain the user name.

1. Generate a secure random password:
   ```bash
   openssl rand -hex 16
   ```
2. Create the OS user (replace `<user name>` with your database username):
   ```bash
   sudo adduser <user name>
   ```

### 5. Reconnect to the Database
Verify your new database credentials:

* **Windows & macOS:**
  ```bash
  psql -U <user name> <database name>
  ```
* **Linux:**
  ```bash
  sudo -u <user name> psql -U <user name> <database name>
  ```

---

## Testing

Run unit/integration tests or end-to-end browser tests using the following package scripts:

| Test Suite | Command |
| :--- | :--- |
| **Jest (Unit/Integration)** | `pnpm jest` |
| **Playwright (End-to-End)** | `pnpm playwright test` |

---

## 🌐 Deployment

This application is deployed and hosted live on **Fly.io**.

