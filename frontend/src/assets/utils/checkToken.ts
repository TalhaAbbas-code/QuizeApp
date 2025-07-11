// utils/checkToken.ts
import axios from "axios";
import { AuthenticatedUser } from "../../types/User";

export const CheckToken = async (
  setUser: (user: AuthenticatedUser | null) => void
) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await axios.get("http://localhost:5000/api/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.user);
  } catch {
    localStorage.removeItem("token");
    setUser(null);
  }
};
