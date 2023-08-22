import { test } from '@playwright/test';
import { login } from '../e2e/helper';
import { HomePage } from '../pages/home.page';

let home: HomePage

test.describe('Login tests', async () => {
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page)
    await home.go()
  })
  test('The user login with success', async ({ }) => {
    await test.step('Success Login', async () => {
      await home.sucessLogin(login.standard, login.pass)
    })
  })
  test('The user inserts wrong credentials', async ({ }) => {
    await test.step('Error Login', async () => {
      await home.errorLogin(login.standard, login.errorpass)
      await home.errorMessage(login.message)
    })
  })
  test('User enters correct lock credentials', async ({ }) => {
    await test.step('Locked login correct pass', async () => {
      await home.locked(login.locked, login.pass)
    })
  })
  test('User enters wrong lock credentials', async ({ }) => {
    await test.step('Locked login wrong pass', async () => {
      await home.lockedLogin(login.locked, login.errorpass)
      await home.errorMessage(login.message)
    })
  })
  test('The user inserts problem credentials', async ({ }) => {
    await test.step('Problem login correct pass', async () => {
      await home.problemLogin(login.problem, login.pass)
    })
  })
  test('User enters wrong problem credentials', async ({ }) => {
    await test.step('Problem login wrong pass', async () => {
      await home.problemError(login.problem, login.errorpass)
      await home.errorMessage(login.message)
    })
  })
  test('Users enters correct performance credentials', async ({ }) => {
    await test.step('Performance login correct pass', async () => {
      await home.performanceLogin(login.performance, login.pass)
    })
  })
  test('Users enters wrong performance credentials', async ({ }) => {
    await test.step('Performance Login', async () => {
      await home.performanceError(login.performance, login.errorpass)
      await home.errorMessage(login.message)
    })
  })
})
