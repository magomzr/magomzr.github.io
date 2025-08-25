import { useEffect } from "react";

export const Umami = ({ websiteId, src = "https://cloud.umami.is/script.js" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-website-id", websiteId);
    script.src = src;
    document.body.appendChild(script);

    // Limpia el script al desmontar el componente
    return () => {
      document.body.removeChild(script);
    };
  }, [websiteId, src]);

  return null; // El script se agrega al body sin renderizar nada en el JSX
};
