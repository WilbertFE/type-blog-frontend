import { useState, useEffect } from "react";
import { UserInterface } from "@/types";
import axios from "axios";

export const useUser = (username: string | undefined) => {
  const [user, setUser] = useState<null | UserInterface>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      if (!username) {
        throw new Error();
      }
      const response = await axios.get(
        `https://type-blog-backend.vercel.app/api/users/${username}`,
        { withCredentials: true }
      );
      const result = response.data;
      setUser(result);
      setLoading(false);
    } catch (err: unknown) {
      console.error("failed to fetch user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  return { user, loading };
};
