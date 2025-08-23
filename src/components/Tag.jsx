import { Link } from "react-router-dom";

const Tag = ({ text, data = null }) => {
  return (
    <Link
      to={`/tags/${text}`}
      className="bg-blue-100 text-blue-800 text-xs font-medium mr-3 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 mb-3 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
    >
      {text} {data && `${data}`}
    </Link>
  );
};

export default Tag;
