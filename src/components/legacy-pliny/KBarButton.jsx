import { useKBar } from "kbar";

export const KBarButton = ({ children, ...rest }) => {
  const { query } = useKBar();

  return (
    <button {...rest} onClick={() => query.toggle()}>
      {children}
    </button>
  );
};
