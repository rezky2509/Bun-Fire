import { createMiddleware } from "hono/factory";
import { auth } from "../utils/auth";
import { HonoEnv } from "../types/types";


// This middleware ensuring only registered user able to access

export const authMiddleware = createMiddleware<HonoEnv>(async(c,next)=>{
    // Fetching the current session 
    const session = await auth.api.getSession({
        // Get the session from the request headers
        headers: c.req.raw.headers
    })

    // If session is not exist 
    if(!session){
        return c.json({
            error: 'Unauthorized'
        },401)
    }

    // Better auth will automatically check the valid token

    // Set the session 
    c.set('user',session.user)
    c.set('session',session.session)

    // Proceed to next code
    return next()
})