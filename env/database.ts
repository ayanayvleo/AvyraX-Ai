// Database configuration
export const DATABASE_CONFIG = {
  POSTGRES_URL: process.env.postgres://postgres.jtphpvdlshkfssoqqrpd:JphNvcWuVUfm5wID@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x!,
  POSTGRES_PRISMA_URL: process.env.postgres://postgres.jtphpvdlshkfssoqqrpd:JphNvcWuVUfm5wID@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true!,
  POSTGRES_URL_NON_POOLING: process.env.postgres://postgres.jtphpvdlshkfssoqqrpd:JphNvcWuVUfm5wID@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require!,
  POSTGRES_USER: process.env.postgres!,
  POSTGRES_PASSWORD: process.env.JphNvcWuVUfm5wID!,
  POSTGRES_DATABASE: process.env.postgres!,
  POSTGRES_HOST: process.env.db.jtphpvdlshkfssoqqrpd.supabase.co!,
} as const
