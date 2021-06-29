const https = require("https");
const crypto = require("crypto");
const log = false;

const makeRequest = require("./utilities").makeRequest;

export async function createWallet(fName, LName, email, birthdate, address) {
  try {
    const body = {
      first_name: "Kushal",
      last_name: "Bhandari",
      ewallet_reference_id: "Kush-02152020",
      metadata: {
        merchant_defined: true,
      },
      type: "person",
      contact: {
        phone_number: "+19093627411",
        email: "dragontakery@gmail.com",
        first_name: "Kushal",
        last_name: "Bhandari",
        contact_type: "business",
        address: {
          name: "Kushal Bhandari",
          line_1: "320 Warren Way",
          line_2: "",
          line_3: "",
          city: "Arcadia",
          state: "CA",
          country: "US",
          zip: "92315",
          phone_number: "+9093627411",
          metadata: { number: 2 },
          canton: "",
          district: "",
        },
        identification_type: "PA",
        identification_number: "1234567890",
        date_of_birth: "04/14/1999",
        country: "US",
        metadata: {
          merchant_defined: true,
        },
      },
    };
    const result = await makeRequest("POST", "/v1/user", body);

    console.log(result);
  } catch (error) {
    console.error("Error completing request", error);
  }
}

export async function getWalletBalance() {
  try {
    const result = await makeRequest(
      "GET",
      "/v1/user/ewallet_4c4cb6d688d87f26bc5e679691c69f04/accounts"
    );
  } catch (error) {
    console.log(error);
  }
}
