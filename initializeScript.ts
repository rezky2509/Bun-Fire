// Run all the necessary script
import {$} from 'bun'
import figlet from 'figlet'
import ora from 'ora'

// Check connection 
import { db } from './src/database/db'
import { sql } from 'drizzle-orm'

const text = await figlet.text('Hono+Drizzle+BetterAuth')
console.log(text)
const spinner = ora('Starting setup...').start();

// Waiting for the container to finish booting up
// The core issue here is that docker compose up -d only waits for the container to start,
// not for the database inside it to finish booting up.
// When a database container starts (especially for the first time), 
// it goes through an internal setup process—initializing files, setting up users, 
// listening on ports—which usually takes longer than 5 seconds. 
// A fixed setTimeout will always be flaky depending on your machine's CPU and disk speed.
async function checkDatabaseConnection() {
    // Checking if the database finished initializing
    let isReady = false;
    let attempts = 0;
    const maxAttempts = 30; // 30 Attempts max wait time

    while (!isReady&&attempts < maxAttempts){
        try{
            await db.execute(sql`SELECT 1`);
            isReady = true;
            db.$client.destroy()
        }catch(error){
            attempts++
            // Wait another 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
}

// Let it run behind the background downloading the database image
spinner.text = 'Initalizing the database...';
await $`docker compose up -d`.quiet()

spinner.text = 'Finishing database initialization...';
await checkDatabaseConnection()

spinner.text = 'Running the migration'
await $`bunx drizzle-kit migrate`

spinner.succeed('All tasks completed!. Your container is now running.');    
process.exit()

