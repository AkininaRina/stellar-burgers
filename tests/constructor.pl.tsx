import { expect, test } from '@playwright/test';

test.describe('Страница конструктора бургера', () => {
test.beforeEach(async ({ page }) => {
  await page.routeFromHAR('tests/hars/ingredients.har', {
    url: '**/api/ingredients'
  });

  await page.routeFromHAR('tests/hars/user.har', {
    url: '**/api/auth/user'
  });

  await page.routeFromHAR('tests/hars/order.har', {
    url: '**/api/orders'
  });

  await page.context().addCookies([
    {
      name: 'accessToken',
      value: 'test-access-token',
      domain: 'localhost',
      path: '/'
    }
  ]);

  await page.goto('/');

  await page.evaluate(() => {
    localStorage.setItem('refreshToken', 'test-refresh-token');
  });
});

test('открывает модальное окно ингредиента и закрывает его крестиком', async ({
  page
}) => {
  await page
    .getByRole('link', { name: /Тестовая булка/ })
    .click();

  await expect(
    page.getByRole('heading', { name: 'Детали ингредиента' })
  ).toBeVisible();

  await expect(
    page.getByRole('heading', { name: 'Тестовая булка' })
  ).toBeVisible();

  await page
    .getByRole('button', { name: 'Закрыть модальное окно' })
    .click();

  await expect(
    page.getByRole('heading', { name: 'Детали ингредиента' })
  ).not.toBeVisible();
});

test('закрывает модальное окно ингредиента по клику на оверлей', async ({
  page
}) => {
  await page
    .getByRole('link', { name: /Тестовая булка/ })
    .click();

  await expect(
    page.getByRole('heading', { name: 'Детали ингредиента' })
  ).toBeVisible();

  await page.mouse.click(10, 10);

  await expect(
    page.getByRole('heading', { name: 'Детали ингредиента' })
  ).not.toBeVisible();
});

  test('добавляет булку и начинку из списка в конструктор', async ({
    page
  }) => {
    const bunCard = page.locator('li').filter({
      hasText: 'Тестовая булка'
    });

    await bunCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page.getByText('Тестовая булка (верх)', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Тестовая булка (низ)', { exact: true })
    ).toBeVisible();

    const mainCard = page.locator('li').filter({
      hasText: 'Тестовая начинка'
    });

    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      page
        .locator('section')
        .filter({ hasText: 'Оформить заказ' })
        .getByText('Тестовая начинка', { exact: true })
    ).toBeVisible();
  });

  test('оформляет заказ', async ({ page }) => {
  const bunCard = page.locator('li').filter({
    hasText: 'Тестовая булка'
  });

  await bunCard.getByRole('button', { name: 'Добавить' }).click();

  const mainCard = page.locator('li').filter({
    hasText: 'Тестовая начинка'
  });

  await mainCard.getByRole('button', { name: 'Добавить' }).click();

  await page.getByRole('button', { name: 'Оформить заказ' }).click();

  await expect(page.getByText('12345')).toBeVisible();

  await page.getByRole('button', {
    name: 'Закрыть модальное окно'
  }).click();

  await expect(
    page.getByRole('heading', { name: 'Детали заказа' })
  ).not.toBeVisible();

await expect(
  page.getByText('Выберите булки').first()
).toBeVisible();

await expect(
  page.getByText('Выберите булки').nth(1)
).toBeVisible();

await expect(
  page.getByText('Выберите начинку')
).toBeVisible();
});
});
