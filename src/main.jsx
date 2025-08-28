import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Tags from "./pages/tags";
import TagPage from "./pages/tag";
import Posts from "./pages/posts";
import Post from "./pages/post";
import Editor from "./pages/editor";
import { MainLayout } from "./layouts/MainLayout";
import "./index.css";

const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: "/tags",
        element: <Tags />,
      },
      {
        path: "/tags/:tag",
        element: <TagPage />,
      },
      {
        path: "/editor",
        element: <Editor />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
