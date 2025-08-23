import { useEffect, useState } from "react";
import GiscusComponent from "@giscus/react";

export const Giscus = ({
  theme = "light",
  darkTheme = "dark",
  repo,
  repositoryId,
  category,
  categoryId,
  reactions,
  metadata,
  inputPosition = "top",
  lang = "en",
  mapping = "pathname",
}) => {
  const [commentsTheme, setCommentsTheme] = useState(theme);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const updateTheme = () => {
      setCommentsTheme(darkModeMediaQuery.matches ? darkTheme : theme);
    };

    updateTheme();
    darkModeMediaQuery.addEventListener("change", updateTheme);

    return () => darkModeMediaQuery.removeEventListener("change", updateTheme);
  }, [theme, darkTheme]);

  const COMMENTS_ID = "comments-container";

  return (
    <GiscusComponent
      id={COMMENTS_ID}
      repo={repo}
      repoId={repositoryId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      reactionsEnabled={reactions}
      emitMetadata={metadata}
      inputPosition={inputPosition}
      theme={commentsTheme}
      lang={lang}
      loading="lazy"
    />
  );
};
