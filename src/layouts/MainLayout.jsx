import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SectionContainer from "../components/SectionContainer";
import Footer from "../components/Footer";
import { Analytics } from "../components/Analytics";
import { config } from "../config";
import { SearchProvider } from "../components/SearchProvider";

export const MainLayout = () => {
  return (
    <>
      <Analytics analyticsConfig={config.analytics} />
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between font-sans">
          <SearchProvider searchConfig={config.search}>
            <Header />
            <main className="mb-auto mt-20">
              <Outlet />
            </main>
          </SearchProvider>
          <Footer />
        </div>
      </SectionContainer>
    </>
  );
};
