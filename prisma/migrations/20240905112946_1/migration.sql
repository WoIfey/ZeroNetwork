-- CreateTable
CREATE TABLE "timeline" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "button" BOOLEAN NOT NULL,
    "buttonURL" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servers" (
    "id" SERIAL NOT NULL,
    "server1" TEXT NOT NULL,
    "server2" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "alert_visible" BOOLEAN NOT NULL,
    "server2_visible" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);
