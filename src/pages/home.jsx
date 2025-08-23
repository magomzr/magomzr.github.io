import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NewsletterForm from "../components/legacy-pliny/NewsletterForm";
import { formatDate } from "../utils";

import LoadingSpinner from "../components/LoadingSpinner";
import Tag from "../components/Tag";

import { config } from "../config";
import apiService from "../services";

const MAX_DISPLAY = 5;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tagsObject, setTagsObject] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await apiService.postMain.get("/");
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

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await apiService.tags.get("/");
        setTagsObject(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const allTags = Object.keys(tagsObject);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center justify-between mt-7">
            <div className="my-6">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                {/* <span className="wave">Hi, I&apos;m </span> */}
                <span className="text-gray-500 dark:text-blue-400">Blog</span>
              </h1>
              <p className="text-indigo-600 text-xl mt-2 mb-6">
                Research and information I learn while coding and studying.
              </p>
              <a
                type="button"
                href="mailto:mariogomezarr@gmail.com"
                target="_blank"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                I am an email away
              </a>
              <a
                type="button"
                href="https://github.com/magomzr"
                target="_blank"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                See my GitHub
              </a>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex flex-row space-x-2">
              <div className="space-y-2 pb-6 pt-6 md:space-y-2">
                <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-7xl sm:leading-10 md:text-5xl md:leading-14">
                  Recent
                </h1>
                <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                  {config.description}
                </p>
              </div>
              <div className="pt-10 pl-5">
                {allTags.length === 0 && "No tags found."}
                <div className="flex flex-wrap mb-3">
                  {allTags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {!posts.length && "No posts found."}
              {posts.slice(0, MAX_DISPLAY).map((post) => {
                const { id, createDate, title, summary, tags } = post;
                return (
                  <li key={id} className="py-6">
                    <article className="hover:-translate-y-1 hover:scale-105 duration-300 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <div className="flex flex-wrap pt-3 pl-3">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>

                      <Link to={`/posts/${id}`} className="text-gray-900 dark:text-gray-100">
                        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 pl-5">
                              <time dateTime={createDate}>
                                {formatDate(createDate, config.locale)}
                              </time>
                            </dd>
                          </dl>
                          <div className="space-y-5 xl:col-span-3 py-1 pr-3">
                            <div className="space-y-6">
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                {title}
                              </h2>
                              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                {summary}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="text-base font-medium leading-6 p-3">
                        <Link
                          to={`/posts/${id}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base font-medium leading-6">
              <Link
                to="/posts"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="All posts"
              >
                All Posts &rarr;
              </Link>
            </div>
          )}
          {config.newsletter?.provider && (
            <div className="flex items-center justify-center">
              <NewsletterForm />
            </div>
          )}
        </>
      )}
    </>
  );
}
