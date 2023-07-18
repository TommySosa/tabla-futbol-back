import express from 'express'
import equiposRoutes from './routes/equipos.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import cors from 'cors';

const app  = express()
// app.use((_req, res, next) => {
    
//     // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api',equiposRoutes)

app.use('/auth',usuariosRoutes)


app.listen(3005)

console.log('Server iniciado en puerto 3005');