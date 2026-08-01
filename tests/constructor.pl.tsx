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
    await page.getByTestId('ingredient-bun-1').click();
    const modal = page.getByTestId('modal');

    await expect(
      modal.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await expect(
      modal.getByRole('heading', { name: 'Тестовая булка' })
    ).toBeVisible();

    await modal.getByRole('button', { name: 'Закрыть модальное окно' }).click();

    await expect(modal).not.toBeVisible();
  });

  test('закрывает модальное окно ингредиента по клику на оверлей', async ({
    page
  }) => {
    await page.getByTestId('ingredient-bun-1').click();

    const modal = page.getByTestId('modal');

    await expect(
      modal.getByRole('heading', { name: 'Детали ингредиента' })
    ).toBeVisible();

    await page.getByTestId('modal-overlay').click({
      position: { x: 10, y: 10 }
    });
    await expect(modal).not.toBeVisible();
  });

  test('добавляет булку и начинку из списка в конструктор', async ({
    page
  }) => {
    const bunCard = page.locator('li').filter({
      hasText: 'Тестовая булка'
    });

    await bunCard.getByRole('button', { name: 'Добавить' }).click();

    const constructor = page.getByTestId('burger-constructor');

    await expect(
      constructor.getByText('Тестовая булка (верх)', { exact: true })
    ).toBeVisible();

    await expect(
      constructor.getByText('Тестовая булка (низ)', { exact: true })
    ).toBeVisible();

    const mainCard = page.locator('li').filter({
      hasText: 'Тестовая начинка'
    });

    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    await expect(
      constructor.getByText('Тестовая начинка', { exact: true })
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

    const orderModal = page.getByTestId('modal');

    await expect(orderModal.getByText('12345')).toBeVisible();

    await orderModal
      .getByRole('button', { name: 'Закрыть модальное окно' })
      .click();

    await expect(orderModal).not.toBeVisible();

    const constructor = page.getByTestId('burger-constructor');

    await expect(constructor.getByText('Выберите булки').first()).toBeVisible();

    await expect(constructor.getByText('Выберите булки').nth(1)).toBeVisible();

    await expect(constructor.getByText('Выберите начинку')).toBeVisible();
  });
});
