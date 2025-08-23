import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ListLayoutWithTags from "../layouts/ListLayoutWithTags";
import { postMainService } from "../api";

const POSTS_PER_PAGE = 5;

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postMainService.get("/");
        const postsResponse = response.data.sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate);
        });
        setPosts(postsResponse);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <ListLayoutWithTags
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  );
}
