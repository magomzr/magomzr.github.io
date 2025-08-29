import { Suspense, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import PostLayout from "../layouts/PostLayout";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingSpinner from "../components/LoadingSpinner";
import { config } from "../config";
import { postService } from "../services/api";

const isProduction = true;

const isValidId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Custom link renderer for react-markdown to handle anchor links with HashRouter
const LinkRenderer = ({ href, children, ...props }) => {
  // Handle anchor links (starting with #)
  if (href && href.startsWith('#')) {
    return (
      <button 
        className="text-primary-600 hover:text-primary-500 underline cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById(href.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        title={`Jump to ${href}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  // Handle external links
  if (href && (href.startsWith('http') || href.startsWith('mailto:'))) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  
  // Handle internal links (fallback to regular anchor tag)
  return <a href={href} {...props}>{children}</a>;
};

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
        const response = await postService.get(`/${id}`);
        const postData = response.data;

        // Set previous and next post navigation
        setPrev({
          path: `${postData?.previous?.id ? `posts/${postData?.previous?.id}` : ""}`,
          title: `Previous - ${postData?.previous?.title}`,
        });
        setNext({
          path: `${postData?.next?.id ? `posts/${postData?.next?.id}` : ""}`,
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
            <Markdown 
              className="prose" 
              remarkPlugins={[remarkGfm]}
              components={{
                a: LinkRenderer
              }}
            >
              {content}
            </Markdown>
          </PostLayout>
        </Suspense>
      )}
    </>
  );
};

export default Post;
