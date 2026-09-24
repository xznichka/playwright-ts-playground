import { APIRequestContext, expect } from "@playwright/test";

export class APIFunctions {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async createUser(userEmail: string, userPassword: string) {
    const createUserResponse = await this.request.post(
      "https://automationexercise.com/api/createAccount",
      {
        form: {
          name: "Test User",
          email: `${userEmail}`,
          password: `${userPassword}`,
          title: "Mrs",
          birth_date: "15",
          birth_month: "6",
          birth_year: "1998",
          firstname: "Anna",
          lastname: "Testowa",
          company: "Test Company",
          address1: "Test Street 123",
          address2: "Apartment 45",
          country: "India",
          zipcode: "30-001",
          state: "Malopolskie",
          city: "Krakow",
          mobile_number: "501234567",
        },
      },
    );
    expect(createUserResponse.status()).toEqual(200);
    return await createUserResponse.json();
  }
  async getAccountDetailsByEmail(userEmail: string) {
    const response = await this.request.get(
      `https://automationexercise.com/api/getUserDetailByEmail`,
      {
        params: {
          email: userEmail,
        },
      },
    );
    expect(response.status()).toBe(200);
    return await response.json();
  }
  async deleteUserAccount(userEmail: string, userPassword: string) {
    const responseDelete = await this.request.delete(
      "https://automationexercise.com/api/deleteAccount",
      {
        form: {
          email: userEmail,
          password: userPassword,
        },
      },
    );
    expect(responseDelete.status()).toBe(200);
    return await responseDelete.json();
  }
  async searchProduct(searchItemName: string) {
    const responseSearch = await this.request.post(
      " https://automationexercise.com/api/searchProduct",
      {
        form: {
          search_product: searchItemName,
        },
      },
    );
    expect(responseSearch.status()).toBe(200);
    return await responseSearch.json();
  }
}
