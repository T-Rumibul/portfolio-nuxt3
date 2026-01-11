import { $fetch, setup, createPage, url } from '@nuxt/test-utils/e2e'
import { test, expect, describe } from 'vitest'
describe('Admin Login Page', async () => {
  await setup({
    dev: true,
    setupTimeout: 120_000,
    teardownTimeout: 120_000,
    env: {
      TURNSTILE_SITE_KEY: '1x00000000000000000000AA'
    }
  })
  test('login success', async () => {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin',
        token: 'smth'
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({

      message: 'Login successful',
      success: true,
      result: expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        username: expect.any(String)
      })

    }))

    const result = response.result;
    expect(result.accessToken.length).toBeGreaterThan(0); // should be greater than 0
    expect(result.refreshToken.length).toBeGreaterThan(0);
    expect(result.username.length).toBeGreaterThan(0);

  }, 20_000)
  test('login fail - wrong password', async () => {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin1',
        token: 'smth'
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({

      message: 'Unauthorized',
      success: false,
    }))

  }, 20_000)
  test('login fail - wrong username', async () => {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin1',
        password: 'admin',
        token: 'smth'
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({

      message: 'Unauthorized',
      success: false,
    }))


  }, 20_000)
  test('login fail - without token', async () => {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin',
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({

      message: 'Invalid request',
      success: false,
    }))


  }, 20_000)
  // will fail if login fail
  test('verify auth - success', async () => {
    const auth = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin',
        token: 'smth'
      }

    }) as any
    const response = await $fetch('/api/admin/verify-login', {
      method: 'POST',
      headers: {
        'access-token': auth.result.accessToken,
        'refresh-token': auth.result.refreshToken,
        'username': auth.result.username
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({
      success: true
    }))
  }, 20_000)
  test('verify auth - wrong access token with valid refresh token', async () => {
    const auth = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin',
        token: 'smth'
      }

    }) as any
    const response = await $fetch('/api/admin/verify-login', {
      method: 'POST',
      headers: {
        'access-token': 'wrong',
        'refresh-token': auth.result.refreshToken,
        'username': auth.result.username
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({
      success: true
    }))
  }, 20_000)
  test('verify auth - wrong access token without refresh token', async () => {
    const auth = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin',
        token: 'smth'
      }

    }) as any
    const response = await $fetch('/api/admin/verify-login', {
      method: 'POST',
      headers: {
        'access-token': 'wrong',
        'refresh-token': 'wrong',
        'username': auth.result.username
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({
      success: false
    }))
  }, 20_000)
  test('verify auth - wrong access token without valid refresh token, but with invalid username', async () => {
    const auth = await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: 'admin',
        password: 'admin',
        token: 'smth'
      }

    }) as any
    const response = await $fetch('/api/admin/verify-login', {
      method: 'POST',
      headers: {
        'access-token': 'wrong',
        'refresh-token': auth.result.refreshToken,
        'username': 'wrong'
      }

    }) as any
    expect(response).toEqual(expect.objectContaining({
      success: false
    }))
  }, 20_000)
})


