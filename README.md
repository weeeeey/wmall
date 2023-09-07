## STORE-ID

https://wmall-admin.vercel.app/api/stores/64d5a71149393292611f0a41

# E-Commerce Admin Page

Next.js 13 App Router, React, Tailwind, Prisma, MySQL

## Video

{% include video id="-Snlr2dZY4g" provider="youtube" %}

## Key Features:

-   We will be using Shadcn UI for the Admin!
-   Our admin dashboard is going to serve as both CMS, Admin and API!
-   You will be able to control mulitple vendors / stores through this single CMS! (For example you can have a "Shoe store" and a "Laptop store" and a "Suit store", and our CMS will generate API routes for all of those individually!)
-   You will be able to create, update and delete categories!
-   You will be able to create, update and delete products!
-   You will be able to upload multiple images for products, and change them whenever you want!
-   You will be able to create, update and delete filters such as "Color" and "Size", and then match them in the "Product" creation form.
-   You will be able to create, update and delete "Billboards" which are these big texts on top of the page. You will be able to attach them to a single category, or use them standalone (Our Admin generates API for all of those cases!)
-   You will be able to Search through all categories, products, sizes, colors, billboards with included pagination!
-   You will be able to control which products are "featured" so they show on the homepage!
-   You will be able to see your orders, sales, etc.
-   You will be able to see graphs of your revenue etc.
-   You will learn Clerk Authentication!
-   Order creation

### Cloning the repository

```shell
git clone https://github.com/weeeeey/wmall---admin.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js


NEXT_PUBLIC_API_URL ="https://wmall-admin.vercel.app/api/stores/64d5a71149393292611f0a41"

NEXT_PUBLIC_TOSS_API_CLIENT =
NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY =


NEXT_PUBLIC_ACCESS_KEY =

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings


```

### Connect to MongoDB and Push Prisma

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```
