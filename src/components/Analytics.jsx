import { Umami } from "./legacy-pliny/Umami";

export const Analytics = ({ umami }) => {
  return (
    <>
      {umami && (
        <Umami {...umami} />
      )}
    </>
  );
};
