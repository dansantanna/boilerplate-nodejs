import jwt from 'jwt-simple'
import User from 'models/user'
import config from 'config.json'

export const token = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!(await user.comparePassword(password))) throw {}
        const exp = new Date().setDate(new Date().getDate() + 1)
        const token = jwt.encode({ _id: user._id, exp }, config.jwt.secret)
        res.status(200).json({ ...user.toJSON(), token })
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'invalid credentials'
        })
    }
}
