import {defineConfig} from 'drizzle-kit'


export default defineConfig ({
    // Your Location of SQL file will be created Here
    out: './src/database',
    // Your Schema Definition Here.
    // Use array of string to add multiple schema 
    // Eg:
    // ['./src/schema/auth-schema.ts','./src/schema/your-new-schema.ts']
    schema: ['./src/schema/auth-schema.ts'],
    // This is the database type
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
})