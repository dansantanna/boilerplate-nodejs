import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { isEmail } from 'utils/validators'
import config from 'config.json'

const name = 'User'

var user = Schema(
    {
        name: {
            type: Schema.Types.String,
            required: [true, 'Name required']
        },
        email: {
            type: String,
            required: [true, 'Email required'],
            lowercase: true,
            validate: [
                {
                    validator: isEmail,
                    message: 'Email invalid'
                },
                {
                    validator: async value =>
                        !(await model(name).countDocuments({
                            email: value
                        })),
                    message: 'Email already exists'
                }
            ]
        },
        password: {
            type: String,
            required: [true, 'Password Required']
        }
    },
    { timestamps: true }
)

user.pre('save', function(next) {
    // Crypt Password
    if (this.password && (this.isModified('passsword') || this.isNew)) {
        const salt = bcrypt.genSaltSync(config.bcrypt.salt)
        const hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
    }
    next()
})

user.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

export default model(name, user)
