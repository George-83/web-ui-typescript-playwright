/**
 * This file contains UI tests for Scenario 1
 */

import { expect } from "@playwright/test"
import { test } from "../utils/fixtures";
import { getUrl, login, logout } from "../utils/utils";


test('Scenario 1', { tag: '@regression' }, async ({ page, pages }) => {
    const { homePage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage } = pages;
    await homePage.open();

    // Login page
    await login(page);
    await expect(page).toHaveURL(getUrl('Inventory'));
    await expect(inventoryPage.pageTitle).toHaveText('Products');

    // Add the first and the last item to the cart
    await inventoryPage.firstAddToCartButton.click();
    await inventoryPage.lastAddToCartButton.click();
    await expect(inventoryPage.firstAddToCartButton).toHaveText('Remove');
    await expect(inventoryPage.lastAddToCartButton).toHaveText('Remove');

    // Verify the correct items are added
    await inventoryPage.cartIconButton.click();
    await expect(cartPage.productsInCart).toHaveCount(2);
    await expect(cartPage.firstProduct).toHaveText('Sauce Labs Backpack');
    await expect(cartPage.secondProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');

    // Remove the first item and add previous to the last item to the cart
    await cartPage.continueShoppingButton.click();
    await inventoryPage.firstAddToCartButton.click();
    await inventoryPage.previousToTheLastButton.click();
    await expect(inventoryPage.firstAddToCartButton).toHaveText('Add to cart');
    await expect(inventoryPage.previousToTheLastButton).toHaveText('Remove');

    // Verify the content again
    await inventoryPage.cartIconButton.click();
    await expect(page).toHaveURL(getUrl('Cart'));
    await expect(cartPage.productsInCart).toHaveCount(2);
    await expect(cartPage.firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(cartPage.secondProduct).toHaveText('Sauce Labs Onesie');

    // Go to checkout
    await cartPage.checkOutButton.click();
    await expect(page).toHaveURL(getUrl('CheckoutStepOne'));
    await checkoutStepOnePage.firstNameInput.fill('Ivan');
    await checkoutStepOnePage.lastNameInput.fill('Ivanov');
    await checkoutStepOnePage.postalCodeInput.fill('5000');
    await checkoutStepOnePage.submitCartButton.click();
    await expect(page).toHaveURL(getUrl('CheckoutStepTwo'));

    // Finish the order
    await checkoutStepTwoPage.finishOrderButton.click();
    await expect(page).toHaveURL(getUrl('CheckoutComplete'));

    // Verify order is placed
    await expect(checkoutCompletePage.checkoutCompleteMessage).toHaveText('Checkout: Complete!');
    await expect(checkoutCompletePage.successImage).toBeVisible();
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toContainText('order has been dispatched');

    // Verify cart is empty
    await expect(checkoutCompletePage.cartBadge).not.toBeVisible();
    await checkoutCompletePage.cartIconButton.click();
    await expect(page).toHaveURL(getUrl('Cart'));
    await expect(cartPage.productsInCart).toHaveCount(0);

    // Logout from the system
    await logout(page);
    await expect(page).toHaveURL('/');
    await expect(homePage.submitLoginButton).toBeVisible();
});