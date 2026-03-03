const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createBlogWithLikes } = require('./helper')

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
    await request.post('/api/users', {
      data: {
        name: 'Duffy Duck',
        username: 'duffy',
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

  describe('Blog created by different user', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'bugs', 'top-secret')
      await createBlog(page, 'new blog entry', 'Little John', 'www.go-home.com')
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'duffy', 'top-secret')
    })

    test('should not find the delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('new blog entry Little John')).toBeVisible()

      await expect(page.getByText('remove')).not.toBeVisible()

    })

  })

  describe('test the sorting of blogs', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'bugs', 'top-secret')

    })

    test('like a blog twice', async ({ page }) => {
      await createBlogWithLikes(page, 'new blog entry', 'Little John', 'www.go-home.com', 2)
      await expect(page.getByText('likes: 2')).toBeVisible()

    })

    test.only('create 3 blogs, in right order', async ({ page }) => {
      await createBlogWithLikes(page, 'the middleclass', 'Little John', 'www.amazon.com', 2)
      await expect(page.getByText('likes: 2')).toBeVisible()
  
      await createBlogWithLikes(page, 'low performer', 'Little John', 'www.go-home.com', 1)
      await expect(page.getByText('likes: 1')).toBeVisible()

      await createBlogWithLikes(page, 'the favourite', 'Mahonie', 'www.best.com', 3)
      await expect(page.getByText('likes: 3')).toBeVisible()

      const likesList = page.getByText('likes: ')
      await expect(likesList).toHaveCount(3);

      await expect(likesList.nth(0)).toContainText('likes: 3');
      await expect(likesList.nth(1)).toContainText('likes: 2');
      await expect(likesList.nth(2)).toContainText('likes: 1');

      // console.log('allTextContents =', await likesList.allTextContents());

    })


  })
})