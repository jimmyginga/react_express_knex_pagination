import { app } from "./src/app.js";
import { createServer } from "http"
const PORT = 8008
const server = createServer(app)

server.listen(PORT, ()=>console.log(`Server is running on ${PORT} port`))
