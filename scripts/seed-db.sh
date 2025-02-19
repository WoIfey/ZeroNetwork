echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Seeding the database..."
docker exec -i zeronetwork-postgres-1 psql -U postgres -d postgres < ./prisma/seed.sql