<h1 style="font-size: 20px;"> Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
</h1>

![linkly](https://github.com/user-attachments/assets/04e59011-3ba8-48d8-9c43-1d7efc766683)


[DEMO LINK](https://www.loom.com/share/a7c228430179412ab39cb47b2158e70f)

Repo for https://linkly.shahpriyanka.com

## Running Locally

> [!NOTE]  
> This project uses [pnpm](https://pnpm.io/) only as a package manager.

1. Clone the repository:

```bash
https://github.com/priyankashah3107/Linkly.git
```

2. Navigate to the project directory:

```bash
cd Linkly
```
# Instant Docker Setup

> [!NOTE]  
> Your Docker Demon should be online

1. Running Script for Instant setup

```
# Gives permission to execute a setup file
chmod +x run_linklyapp.sh

# Runs the setup script file
./run_linklyapp.sh
```


# Docker Compose up 
```
docker-compose up 
```
# Traditional Docker Setup

(Optional) 

```bash
docker run -p 3000:3000 -e DATABASE_URL="postgres"
JWT_SECRET="alkjalkfjdladf"
BASE_URL="http://localhost:3000"
IPINFO_API_KEY="asdkjgfkjl"
priyankashah31/linklyapp
``` 



1. Create a .env file:

   - Copy `.env.example` and rename it to `.env`.


2. Install dependencies:

```bash
pnpm install
```

3. Run database migrations:

```bash
pnpm prisma:migrate
```

4. Generate prisma client

```bash
pnpm prisma generate
```

5. Seed the database:

```bash
pnpm db:seed
```

6. Start the development server:

```bash
pnpm dev
```

## Usage

1. Access the application in your browser:

```bash
http://localhost:3000
```

2. Login using any of the following provided user credentials:

- Email: `testuser@example.com`, Password: `123456789`

- Email: `testuser2@example.com`, Password: `123456789`

