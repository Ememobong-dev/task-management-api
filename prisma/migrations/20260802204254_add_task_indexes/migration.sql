-- CreateIndex
CREATE INDEX "tasks_createdAt_idx" ON "tasks"("createdAt");

-- CreateIndex
CREATE INDEX "tasks_projectId_completed_createdAt_idx" ON "tasks"("projectId", "completed", "createdAt");
