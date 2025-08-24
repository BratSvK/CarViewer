import { AuthUser } from "../types/auth/authUser";

const authService = {
  async register(email: string, password: string): Promise<AuthUser> {
    // const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    // const user = userCredential.user;

    // const token = await user.getIdToken();

    // await http.post('/users', {
    //   uid: user.uid,
    //   email: user.email,
    // }, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });

    // return { uid: user.uid, email: user.email };

    console.log("Register called with:", email, password);
    return { uid: "sdfsfsfsdfsfsf", email: "fake@gmail.com" }; 
  },

  async login(email: string, password: string): Promise<AuthUser> {
    // const userCredential = await auth().signInWithEmailAndPassword(email, password);
    // const user = userCredential.user;
    // return { uid: user.uid, email: user.email };

    console.log("Login called with:", email, password);
    return { uid: "sdfsfsfsdfsfsf", email: "fake@gmail.com" }; 
  },

  async forgotPassword(email: string): Promise<void> {
    // await auth().sendPasswordResetEmail(email);
    console.log("Calling API .NET:", email);
  }
};

export default authService;
