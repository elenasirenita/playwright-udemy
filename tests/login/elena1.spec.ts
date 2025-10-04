import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5501/login.html');
  await expect(page.getByRole('heading')).toContainText('Inicio de sesión');
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user');
  await expect(page.getByRole('textbox', { name: 'Nombre de usuario:' })).toHaveValue('user');
  await expect(page.getByText('Nombre de usuario:')).toBeVisible();
  await page.getByRole('textbox', { name: 'Contraseña:' }).fill('pass');
  await expect(page.getByRole('textbox', { name: 'Contraseña:' })).toHaveValue('pass');
  await expect(page.getByText('Contraseña:')).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading')).toContainText('Transacciones');
  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.getByRole('textbox', { name: 'Fecha:' }).fill('2023-10-20');
  await page.getByRole('spinbutton', { name: 'Monto:' }).fill('400');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('desc1');
  await page.getByRole('button', { name: 'Guardar' }).click();
  //await page.pause();
});