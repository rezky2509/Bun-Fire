import { betterAuth } from "better-auth";
import {drizzleAdapter} from 'better-auth/adapters/drizzle'

// OPENAPI documentation 
import {openAPI} from 'better-auth/plugins'

// Your better-auth schema 
import * as schema from '../schema/auth-schema'

import { db } from "../database/db";

export const auth = betterAuth({
    baseURL: process.env.BASE_URL,
    database: drizzleAdapter(db,{
        provider:"mysql",
        // Your Auth Schema go here
        schema
    }),
    plugins:[
        openAPI()
    ],
    advanced:{
        database:{
            generateId:"uuid"
        }
    },
    emailAndPassword:{
        enabled: true
    }
});