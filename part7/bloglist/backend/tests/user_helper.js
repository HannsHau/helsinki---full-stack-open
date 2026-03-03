const User = require('../models/user')

const initialUsers = [
  {
    "username": "roadrunner",
    "name": "Roadrunner",
    "password": "top-secret"
  },
  {
    "username": "bugs",
    "name": "Bugs Bunny",
    "password": "top-secret"
  }
]

const newUser = {
    "username": "duffy",
    "name": "Duffy Duck",
    "password": "top-secret"
  } 

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers, newUser, usersInDb
}