import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ListLayout from "../layouts/ListLayoutWithTags";
import LoadingSpinner from "../components/LoadingSpinner";
import { tagService } from "../services/api";

export default function TagPage() {
  const { tag } = useParams();
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await tagService.get(`/${tag}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [tag]);

  return (
    <>
      {loading && <LoadingSpinner />}
      <ListLayout posts={posts} title={title} />
    </>
  );
}
