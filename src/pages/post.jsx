import { Suspense, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import apiService from "../services";
import PostLayout from "../layouts/PostLayout";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingSpinner from "../components/LoadingSpinner";
import { config } from "../config";

const isProduction = true;

const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isValidId(id)) {
      navigate("/not-found");
      return;
    }

    const fetchPostData = async () => {
      try {
        const response = await apiService.postById.get(`/${id}`);
        const postData = response.data;

        // Set previous and next post navigation
        setPrev({
          path: `${postData?.previous?.id ? `blog/${postData?.previous?.id}` : ""}`,
          title: `Previous - ${postData?.previous?.title}`,
        });
        setNext({
          path: `${postData?.next?.id ? `blog/${postData?.next?.id}` : ""}`,
          title: `Next - ${postData?.next?.title}`,
        });

        setPost(postData);
        if (postData?.content) {
          setContent(JSON.parse(postData.content));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {isProduction && post && "draft" in post && post.draft === true ? (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <PostLayout
            content={{
              filepath: "",
              path: "",
              slug: id,
              createDate: post?.createDate,
              title: post?.title,
              tags: post?.tags,
            }}
            authorDetails={{
              name: config.author,
              linkedin: config.linkedin,
              avatar: config.avatar,
            }}
            next={next}
            prev={prev}
          >
            <Markdown className="prose" remarkPlugins={[remarkGfm]}>
              {content}
            </Markdown>
          </PostLayout>
        </Suspense>
      )}
    </>
  );
};

export default Post;
