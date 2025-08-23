import { useState, useEffect } from "react";
import { KBarProvider } from "kbar";
import { KBarModal } from "./KBarModal";
import { formatDate } from "../../utils";

export const KBarSearchProvider = ({ kbarConfig, children }) => {
  const { searchDocumentsPath, defaultActions, onSearchDocumentsLoad } =
    kbarConfig;
  const [searchActions, setSearchActions] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const navigateTo = (path) => {
    // Implementa aquí tu lógica de navegación personalizada
    window.location.href = "/" + path;
  };

  useEffect(() => {
    const mapPosts = (posts) => {
      return posts.map((post) => ({
        id: post.path,
        name: post.title,
        keywords: post?.summary || "",
        section: "Content",
        subtitle: formatDate(post.date, "en-US"),
        perform: () => navigateTo(post.path),
      }));
    };

    const fetchData = async () => {
      if (searchDocumentsPath) {
        const url = searchDocumentsPath.startsWith("http")
          ? searchDocumentsPath
          : new URL(searchDocumentsPath, window.location.origin);
        const res = await fetch(url);
        const json = await res.json();
        const actions = onSearchDocumentsLoad
          ? onSearchDocumentsLoad(json)
          : mapPosts(json);
        setSearchActions(actions);
        setDataLoaded(true);
      }
    };

    if (!dataLoaded && searchDocumentsPath) {
      fetchData();
    } else {
      setDataLoaded(true);
    }
  }, [defaultActions, dataLoaded, searchDocumentsPath, onSearchDocumentsLoad]);

  return (
    <KBarProvider actions={defaultActions}>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  );
};
