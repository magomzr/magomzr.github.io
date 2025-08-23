import { useState } from "react";
import { Giscus } from "./legacy-pliny/Giscus";
import { config } from "../config";

export default function Comments() {
  const [loadComments, setLoadComments] = useState(true);
  const { giscusConfig } = config.comments;
  return (
    <>
      {!loadComments && <button onClick={() => setLoadComments(true)}>Load Comments</button>}
      {giscusConfig && loadComments && (
        <Giscus
          repo={giscusConfig.repo}
          repositoryId={giscusConfig.repositoryId}
          category={giscusConfig.category}
          categoryId={giscusConfig.categoryId}
          reactions={giscusConfig.reactions}
          metadata={giscusConfig.metadata}
          theme={giscusConfig.theme}
          darkTheme={giscusConfig.darkTheme}
          lang={giscusConfig.lang}
          mapping={giscusConfig.mapping}
        />
      )}
    </>
  );
}
