// This is your endpoint definition
import {Hono} from 'hono'
import { HonoEnv } from '../types/types'
import { authMiddleware } from '../middleware/auth-middleware'

// Your Service Import
import { getExample } from '../service/example.service'

// This need to be exported to the root file for it to be registered
export const exampleController = new Hono<HonoEnv>()

// Implement middleware 
exampleController.use(authMiddleware)

// Define your endpoint here 
// use .put for PUT HTTP method
// You also can define validation using zod  
https://hono.dev/docs/guides/validation#zod-validator-middleware

exampleController.get('/example',async(c)=>{
    return c.json({
        result: await getExample()
    },200)
})

// You can use the chaining and using the HTTP Method to define the endpoint and HTTP Method
// https://hono.dev/docs/api/routing