const _ = require('lodash')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./user_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    // let userObject = new User(user)
    // await userObject.save()
    await api
      .post('/api/users')
      .send(user)
  }
})

describe('user tests', () => {

  test('user are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, helper.initialUsers.length)
  })

  test('add a new user', async () => {

    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    names = usersAtEnd.map(n => n.name)
    assert(names.includes(helper.newUser.name))
  })

  test('add a user with a duplicate name, needs to be unique', async () => {
    const usersFromInit = await helper.usersInDb()

    const newUser = helper.newUser
    newUser.username = usersFromInit[0].username

    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(400)
  })

  test('username min 3 character', async () => {

    const newUser = structuredClone(helper.newUser)
    newUser.username = "mo"

    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(400)
  })

  test('password min 3 character', async () => {

    const usersAtStart = await helper.usersInDb()
    assert(usersAtStart.length === 2)

    const newUser = {
      "username": "speedy",
      "name": "Speedy González",
      "password": "t0"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})