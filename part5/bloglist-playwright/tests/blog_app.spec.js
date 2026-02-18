const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Bugs Bunny',
        username: 'bugs',
        password: 'top-secret'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

  
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'bugs', 'top-secret')
      await expect(page.getByText('Bugs Bunny logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'bugs', 'wrong')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Bugs Bunny logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'bugs', 'top-secret')
      await createBlog(page, 'new blog entry', 'Little John', 'www.go-home.com')
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('new blog entry Little John')).toBeVisible()
    })

    test('like a blog', async ({page}) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('user can delete a created blog', async ({page}) => {

      const entry = page.getByText('new blog entry Little John')

      await expect(entry).toHaveCount(1);

      await page.getByRole('button', { name: 'view' }).click()
      await page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(entry).toHaveCount(0);

    })
  })
})