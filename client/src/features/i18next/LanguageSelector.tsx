import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { langs } from "./";

const Wrapper = styled.div`
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const LanguageSelector = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  return (
    <Wrapper>
      {Object.keys(langs).map((lang) => {
        const [, , ...path] = pathname.split("/");
        if (i18n.language === lang) {
          return <span key={lang}>{langs[lang].nativeName}</span>;
        }
        return (
          <Link
            key={lang}
            to={`${lang === "en" ? "/" : "/es/"}${path.join("/")}`}
          >
            {langs[lang].nativeName}
          </Link>
        );
      })}
    </Wrapper>
  );
};
