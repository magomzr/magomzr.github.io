import { Umami } from "./legacy-pliny/Umami";

export const Analytics = ({ analyticsConfig }) => {
  return (
    <>
      {analyticsConfig.umamiAnalytics && (
        <Umami {...analyticsConfig.umamiAnalytics} />
      )}
    </>
  );
};
