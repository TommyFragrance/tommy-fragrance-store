generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum OrderStatus {
  NEW
  CONTACTED
  PAID
  SHIPPED
  DONE
  CANCELLED
}

enum OrderChannel {
  TELEGRAM
  WHATSAPP
}

enum UserRole {
  ADMIN
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String?
  passwordHash String
  role         UserRole @default(ADMIN)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Brand {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  country     String?
  description String?
  imageUrl    String?
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id                    String   @id @default(cuid())
  slug                  String   @unique
  name                  String
  brandId               String
  brand                 Brand    @relation(fields: [brandId], references: [id], onDelete: Cascade)
  year                  Int?
  perfumer              String?
  concentration         String?
  brandCountry          String?
  gender                String?
  aromaType             String?
  description           String?  @db.Text
  history               String?  @db.Text
  longevity             String?
  sillage               String?
  seasonality           String[]
  topNotes              String[]
  heartNotes            String[]
  baseNotes             String[]
  similarAromas         String[]
  sources               String[]
  imageUrl              String?
  pricePerMlCents       Int?
  fullBottleMl          Int?
  fullBottlePriceCents  Int?
  availableVolumesMl    Int[]    @default([1,2,3,5,10,15,20,30,50])
  stockMl               Int      @default(0)
  stockBottles          Int      @default(0)
  isPublished           Boolean  @default(false)
  metaTitle             String?
  metaDescription       String?
  orders                Order[]
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@index([brandId])
  @@index([slug])
  @@index([isPublished])
}

model Order {
  id               String       @id @default(cuid())
  productId        String
  product          Product      @relation(fields: [productId], references: [id], onDelete: Cascade)
  volumeLabel      String
  volumeMl         Int?
  priceCents       Int
  channel          OrderChannel
  status           OrderStatus  @default(NEW)
  customerName     String?
  customerContact  String?
  note             String?      @db.Text
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt

  @@index([status])
  @@index([createdAt])
}
