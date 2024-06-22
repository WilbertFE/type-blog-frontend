import { useEffect, useState } from "react";
import { BlogInterface } from "@/types";
import axios from "axios";

export const useUserBlogs = (username: string | undefined) => {
  const [blogs, setBlogs] = useState<null | BlogInterface[]>(null);

  const getBlogs = async () => {
    try {
      if (!username) {
        throw new Error();
      }
      const response = await axios.get(
        `https://type-blog-backend.vercel.app/api/blogs/${username}`
      );
      const result = response.data;
      setBlogs(result);
    } catch (err: unknown) {
      console.error("Failed to get user blog");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return { blogs };
};
