import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import db from 'db'
import config from 'config.json'
import routes from 'routes'
import path from 'path'
import swagger from 'swagger-ui-express'
import swaggerDoc from 'swagger.json'

let app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

// Cors Middleware
app.use(cors())

// Body Parser
app.use(bodyParser.json({ limit: config.bodyLimit }))

// Routes
app.use(routes)

// connect to db
db.once('open', () =>
  app.server.listen(process.env.PORT || config.port, () =>
    console.log('Started on port \x1b[36m%s\x1b[0m', app.server.address().port)
  )
)

db.on('error', () =>
  console.log('\x1b[31m%s\x1b[0m', 'Error connecting to database')
)

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc))

app.use((req, res) => {
  if (req.headers.accept.includes('text/html'))
    res.status(404).sendFile(path.join(`${__dirname}/public/404.html`))
  else res.status(404).send({ status: 'error', message: 'Page not found' })
})

export default app
