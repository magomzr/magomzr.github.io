import { useLocation, Link } from "react-router-dom";
import { slug } from "github-slugger";
import { useEffect, useState } from "react";
import { siteData } from "../config";
import Tag from "../components/Tag";
import { tagsService } from "../api";
import { formatDate } from "../utils";

function Pagination({ totalPages, currentPage }) {
  const location = useLocation();
  const basePath = location.pathname.split("/")[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            to={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link to={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}) {
  const location = useLocation();

  const [tagsObject, setTagsObject] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await tagsService.get("/");
        setTagsObject(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const tags = Object.keys(tagsObject);

  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-blue-900 capitalize dark:text-blue-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title.split("-").join(" ")}
          </h1>
        </div>
        <div className="flex">
          <div className="hidden mr-8 mt-3 h-full sm:flex flex-wrap bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px]">
            <div className="py-4 px-6">
              {location.pathname.startsWith("/posts") ? (
                <h3 className="text-primary-500 font-bold uppercase">
                  All Posts
                </h3>
              ) : (
                <Link
                  to={`/posts`}
                  className="font-bold uppercase text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {tags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {location.pathname.split("/tags/")[1] === slug(t) ? (
                        <h3 className="inline py-2 px-3 bg-blue-100 text-blue-800 text-xs font-medium mr-3 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300  hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white">
                          {`${t.split(" ").join("-")} (${tagsObject[t]})`}
                        </h3>
                      ) : (
                        <Link
                          to={`/tags/${t}`}
                          className="py-2 px-3 bg-blue-100 text-blue-800 text-xs font-medium mr-3 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300  hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t.split(" ").join("-")} (${tagsObject[t]})`}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { id, createDate, title, summary, tags } = post;
                return (
                  <li key={id} className="py-5">
                    <article className="space-y-2 p-5 flex flex-col xl:space-y-0 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:-translate-y-1 hover:scale-108 duration-300">
                      <div className="flex flex-wrap mt-0">
                        {tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                      <Link
                        to={`/posts/${id}`}
                        className="text-gray-900 dark:text-gray-100"
                      >
                        <div>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={createDate}>
                                {formatDate(createDate, siteData.locale)}
                              </time>
                            </dd>
                          </dl>
                          <div className="space-y-3">
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              {title}
                            </h2>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {summary}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
