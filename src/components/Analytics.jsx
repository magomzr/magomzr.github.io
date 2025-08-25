import { Umami } from "./legacy-pliny/Umami";

export const Analytics = ({ analytics }) => {
  return (
    <>
      {analytics.umami && (
        <Umami {...analytics.umami} />
      )}
    </>
  );
};
