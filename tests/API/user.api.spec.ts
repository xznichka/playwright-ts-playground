import { test, expect } from "@playwright/test";
import { APIFunctions } from "../../api/api.functions";
import { faker } from "@faker-js/faker";

test("User account lifecycle", async ({ request }) => {
  const apiFunctions = new APIFunctions(request);
  const userEmail = `testuser+${Date.now()}@meow.com`;
  const userPassword = `${faker.internet.password()}`;
  const createUserResponse = await apiFunctions.createUser(
    userEmail,
    userPassword,
  );
  expect(createUserResponse.message).toContain("User created!");
  const getAccountDetailsResponse =
    await apiFunctions.getAccountDetailsByEmail(userEmail);
  expect(getAccountDetailsResponse.user.id).toBeTruthy();
  const deleteUserResponse = await apiFunctions.deleteUserAccount(
    userEmail,
    userPassword,
  );
  expect(deleteUserResponse.message).toContain("Account deleted!");
});
