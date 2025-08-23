import { useEffect } from "react";

export const Umami = ({
  umamiWebsiteId,
  src = "https://analytics.umami.is/script.js",
}) => {
  useEffect(() => {
    // Agrega el script de Umami cuando el componente se monta
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.setAttribute("data-website-id", umamiWebsiteId);
    script.src = src;
    document.body.appendChild(script);

    // Limpia el script al desmontar el componente
    return () => {
      document.body.removeChild(script);
    };
  }, [umamiWebsiteId, src]);

  return null; // El script se agrega al body sin renderizar nada en el JSX
};
