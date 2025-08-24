import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import apiService from "../services";
import MDEditor from "@uiw/react-md-editor";
import TagsInput from "react-tagsinput";
import toast, { Toaster } from "react-hot-toast";
import "../css/tags-input.css";
import { draftService, postService, tokenService } from "../services/api";

const mkdStr = `# Markdown Editor

Insert text here.

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
\`\`\`
`;

export default function Editor() {
  const [value, setValue] = useState(mkdStr);
  const [title, setTitle] = useState("");
  const [blogId, setBlog] = useState("");
  const [IsSaved, setSaved] = useState(false);
  const [IsDraft, setDraft] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState([]);
  const [token, setToken] = useState("");
  const [IsAuthorized, setAuthorized] = useState(false);
  const [IsEdit, setIsEdit] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [error, setError] = useState("");

  const save = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const post = {
        title: title,
        summary: summary,
        layout: "PostSimple",
        isDraft: IsDraft,
        tags: tags,
        author: "Mario Gomez",
        content: JSON.stringify(value),
      };
      if (IsEdit) {
        await apiService.postMain.put(`/${blogId}`, post);
        toast.success("Updated");
      } else {
        await apiService.postMain.post("/", post);
        toast.success("Created");
      }
      setSaved(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const loadPost = async (e, directId = null) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const id = directId || blogId;
      const response = await postService.get(`/${id}`);
      if (!response.data.id) {
        setIsLoading(false);
        return;
      }
      const parsedContent = JSON.parse(response.data.content);
      setValue(parsedContent);
      setTitle(response.data.title);
      setSummary(response.data.summary);
      setDraft(response.data.isDraft);
      setTags(response.data.tags);
      setIsEdit(true);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const authorize = async (e) => {
    e.preventDefault();
    try {
      const { data } = await tokenService.post("", { secretKey });
      setAuthorized(true);
      draftPosts(data.token);
    } catch (error) {
      console.log({ error });
      setError("Something went wrong", error.message);
    }
  };

  const draftPosts = async (token) => {
    try {
      const response = await draftService(token).get();
      setDrafts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const handleDraftChange = () => {
    setDraft(!IsDraft);
  };

  const draftClick = (e, el) => {
    e.preventDefault();
    setBlog(el);
    loadPost(e, el);
  };

  const handleEditorChange = (value) => {
    setValue(value);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="">
        <div className="mb-4">
          <div className="p-2">
            <input
              className="border-gray-300 border-2 px-2 py-1 rounded text-sm"
              type="text"
              value={blogId}
              onChange={(e) => setBlog(e.target.value)}
              placeholder="Id for update"
            />
            <button
              className="bg-primary-500 px-3 py-1.5 ml-3 text-sm rounded text-white disabled:opacity-50"
              onClick={loadPost}
              disabled={blogId === ""}
            >
              {" "}
              Load{" "}
            </button>
          </div>
          <div className="p-2">
            <input
              className="border-gray-300 border-2 px-2 py-1 rounded"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <input
              type="checkbox"
              className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={IsDraft}
              onChange={handleDraftChange}
            />{" "}
            Is draft?
          </div>
          <div className="p-2">
            <input
              className="border-gray-300 border-2 px-2 py-1 rounded"
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary"
            />
          </div>
          <div>
            <div className="p-2 px-2 py-1 rounded">
              <TagsInput value={tags} onChange={handleTagsChange} />
            </div>
          </div>
        </div>
        <h1 className="mt-8 mb-5 text-xl font-bold">Body</h1>
        <hr />
        <div>
          <MDEditor height={500} value={value} onChange={handleEditorChange} />
        </div>
        <div className="mt-3">
          {!IsAuthorized ? (
            <div>
              <input
                className="border-gray-300 border-2 px-2 py-1 rounded text-sm"
                type="text"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Secret key"
              />
              <button
                className="mx-5 text-sm bg-green-500 p-1.5 rounded text-white"
                onClick={authorize}
              >
                {" "}
                Authorize{" "}
              </button>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
          ) : (
            <div className="flex flex-row space-x-2">
              <div className="w-full mt-4">
                <h3 className="text-xl text-blue-600 font-semibold">Drafts</h3>

                {drafts.length === 0 && <p className="mt-2 text-sm">No drafts found.</p>}
                <ul>
                  {drafts.map((el) => {
                    return (
                      <div
                        key={el.id}
                        className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400"
                      >
                        <li>
                          {el.title}{" "}
                          <button
                            className="ml-5 px-3 py-1 text-xs font-medium text-center text-white bg-purple-700 rounded hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={(e) => draftClick(e, el.id)}
                          >
                            Edit
                          </button>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-4 justify-end items-end text-align-right justify-items-end w-48">
                <button className="bg-primary-500 py-1 px-8 mt-1 rounded text-white" onClick={save}>
                  {IsEdit ? "Update" : "Save"}
                </button>
                <p className="mt-2 text-gray-400 text-sm">Authorized</p>
              </div>
            </div>
          )}
          {IsSaved && (
            <Toaster
              toastOptions={{ duration: 10000 }}
              position="bottom-right"
              reverseOrder={false}
            ></Toaster>
          )}
        </div>
      </div>
    </>
  );
}
