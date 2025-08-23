import { KBarSearchProvider } from "./legacy-pliny/KBar";

export const SearchProvider = ({ searchConfig, children }) => {
  if (searchConfig && searchConfig.provider === "kbar") {
    return (
      <KBarSearchProvider kbarConfig={searchConfig.kbarConfig}>
        {children}
      </KBarSearchProvider>
    );
  } else {
    console.log("No suitable provider found. Please choose kbar.");
    return <>{children}</>;
  }
};
