/*
  Warnings:

  - A unique constraint covering the columns `[FK_ID_USUARIO]` on the table `TB_PERMISSAO_USUARIO` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TB_PERMISSAO_USUARIO_FK_ID_USUARIO_key" ON "TB_PERMISSAO_USUARIO"("FK_ID_USUARIO");
