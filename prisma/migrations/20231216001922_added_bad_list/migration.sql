-- CreateTable
CREATE TABLE "BadPlayers" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "kdratio" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BadPlayers_pkey" PRIMARY KEY ("id")
);
