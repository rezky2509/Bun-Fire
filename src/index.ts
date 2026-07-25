import { Hono } from 'hono'
import {cors} from 'hono/cors'
import { auth } from './utils/auth'
import { exampleController } from './controller/example.controller'

const app = new Hono()


// Better Auth Route Definition 
app.on(["POST","GET"],"/api/auth/*",(c)=>auth.handler(c.req.raw))
// Register your endpoint here 
// Eg: 
// app.route('/api/v1/',yourRouteControllerDefinition)
// Below is just example
app.route('/api/v1/',exampleController)

// CORS configuration
// https://hono.dev/docs/middleware/builtin/cors#usage
app.use('/api/*',
  cors({
    // Define your list of Client URL here 
    origin:['localhost:3000'],
    allowHeaders:['Content-Type','Authorization'],
    // Define the 
    maxAge: 600,
    credentials: true
  })
)

export default app

// If you want to customize the port number 
// export default {
// Change the port here
//   port: 3060,
// }