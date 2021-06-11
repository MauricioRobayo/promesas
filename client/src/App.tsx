import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import GPromise from "./features/gPromises/GPromise";
import { selectCurrentGPromise } from "./features/gPromises/gPromisesSlice";
import { Home } from "./features/home";
import { LanguageSelector } from "./features/i18next";
import Twemoji from "./features/twemoji/Twemoji";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 2rem 0;
  font-weight: 900;
`;

function App() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const currentGPromise = useSelector(selectCurrentGPromise);

  useEffect(() => {
    const [, lang] = pathname.split("/");
    i18n.changeLanguage(lang || "en");
  }, [pathname, i18n]);

  return (
    <>
      <Main>
        <Title>
          <Twemoji emoji="🙏" /> {t("God's Promises")}
        </Title>
        {currentGPromise ? <GPromise gPromise={currentGPromise} /> : <Home />}
      </Main>
      <LanguageSelector />
    </>
  );
}

export default App;
