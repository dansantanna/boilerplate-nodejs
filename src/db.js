import mongoose from 'mongoose'
import config from './config.json'

const db = config.mongodb

// https://mongoosejs.com/docs/deprecations.html
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

const URI = `${db.driver}://${db.username}:${db.password}@${db.host}/${db.database}`

mongoose.connect(URI)

export default mongoose.connection
