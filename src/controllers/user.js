import User from 'models/user'

export const create = async ({ body }, res) => {
  try {
    const user = await new User(body).save()
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const list = async ({ body }, res) => {
  try {
    const list = await User.find({ ...body })
    res.status(200).json(list)
  } catch (error) {
    res.status(400).json(error)
  }
}
