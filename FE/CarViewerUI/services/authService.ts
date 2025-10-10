import { Buffer } from "buffer";
import { AuthUser } from "../types/auth/authUser";
import { LoggedUser } from "../types/auth/loggedUser";
import { RegisterUserCommand } from "../types/auth/registerUserRequest";
import http from "../util/http";

const BASE_PATH = "/auth";

function hashCredentials(email: string, password: string) {
  const token = `${email}:${password}`;
  const encodedToken = Buffer.from(token).toString("base64");

  return encodedToken;
}

const authService = {
  async register(request: RegisterUserCommand): Promise<AuthUser> {
    const res = await http.post<string>(
      `${BASE_PATH}/register`,
      request
    );

    return { uid: res.data, token: "" };
  },

  async login(email: string, password: string): Promise<AuthUser> {
    const res = await http.get<LoggedUser>(`${BASE_PATH}/login`, {
      headers: {
        Authorization: `Basic ${hashCredentials(email, password)}`,
      },
    });

    return { uid: res.data.userId, token: res.data.token  };
  },

  async forgotPassword(email: string): Promise<void> {
    // await auth().sendPasswordResetEmail(email);
    console.log("Calling API .NET:", email);
  }
};

export default authService;