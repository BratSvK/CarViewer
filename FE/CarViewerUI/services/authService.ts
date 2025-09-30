import { Buffer } from "buffer";
import { AuthUser } from "../types/auth/authUser";
import { RegisterUserCommand } from "../types/auth/registerUserRequest";
import { Result } from "../types/result";
import http from "../util/http";
import { handleResult } from "../util/resultHandler";

const BASE_PATH = "/auth";

function hashCredentials(email: string, password: string) {
  const token = `${email}:${password}`;
  const encodedToken = Buffer.from(token).toString("base64");

  return encodedToken;
}

const authService = {
  async register(request: RegisterUserCommand): Promise<AuthUser> {
    console.log("Register called with:", request);
    const res = await http.post<Result<string>>(
      `${BASE_PATH}/register`,
      request
    );

    const result: string = handleResult(res.data);

    return { uid: result };
  },

  async login(email: string, password: string): Promise<AuthUser> {
    const res = await http.get<Result<string>>(`${BASE_PATH}/login`, {
      headers: {
        Authorization: `Basic ${hashCredentials(email, password)}`,
      },
    });

    console.log("Response from login API:", res.data);
    // const result: string = handleResult(res.data);
    // console.log("Login successful, uid:", result);

    return { uid: "sdfsfsfsdfsfsf" };
  },

  async forgotPassword(email: string): Promise<void> {
    // await auth().sendPasswordResetEmail(email);
    console.log("Calling API .NET:", email);
  },

  async tryAPI(payload: string): Promise<string> {
    // Simulácia volania API
    console.log("Calling API .NET:", payload);
    console.log(`Full URL: ${http.defaults.baseURL}${BASE_PATH}/demo`);

    const res = await http.post(`${BASE_PATH}/demo`, `"${payload}"`);
    return res.data;
  },
};

export default authService;