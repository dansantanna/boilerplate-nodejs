import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import User from 'models/user'
import { jwt } from 'config.json'

export default () => {
    const params = {
        secretOrKey: jwt.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params, async ({ _id, exp }, done) => {
        const user = await User.findById(_id)
        if (!exp || Date.now() >= exp) done('Token expired')
        if (!user) done('User not found')
        else done(null, user)
    })
    passport.use(strategy)
    return passport.authenticate('jwt', { session: jwt.session })
}
