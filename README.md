# Alles Labs Interview Assignment

## Task

- [x] User can create new workflow
- [x] User can modify workflow name
- [x] User can delete workflow if it's empty
- [x] User can add task to workflow with name & description
- [x] User can modify task details
- [x] User can modify task status
- [x] User can reordering workflow and task
- [x] Multiple boards
- [x] User can move / order card by drag & drop
- [x] i18n feature which currently support `en`
- [x] Responsive design
- [x] Show description when list is empty
- [x] 404 page
- [x] Auto focus on initial state
- [x] Input validation
- [ ] Test codes

## Project Overview

![Screenshot 1](/public/static/assets/img-1.png)
![Screenshot 2](/public/static/assets/img-2.png)
![Screenshot 3](/public/static/assets/img-3.png)
![Screenshot 4](/public/static/assets/img-4.png)s

## Project Setup

### Step 1

Copy `.env` from `.env.example`

```sh
cp .env.example .env
```

### Step 2

```sh
yarn install
```

## Running Project

### Local

```sh
yarn dev
```

### Docker

```sh
docker-compose -f docker-compose.dev.yaml up --build
```

## Build

```sh
yarn build
```