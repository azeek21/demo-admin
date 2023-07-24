import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

class Auth {
  static async login(data: LoginData) {
    try {
      const resp = await axios.post(BASE_URL + "auth/login", data);
      if (resp.data.success) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return false;
  }

  static async isAuthenticated() {
    const authed = sessionStorage.getItem("authed");
    return Boolean(authed);
  }
}

export default Auth;
