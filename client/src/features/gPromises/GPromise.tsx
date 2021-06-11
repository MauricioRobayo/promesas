import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import useRandomGPromise from "../../hooks/useRandomGPromise";
import { langs } from "../i18next";
import Twemoji from "../twemoji/Twemoji";
import {
  GPromise as GPromiseType,
  selectAllGPromises,
  selectNextGPromise,
  setCurrentGPromise,
  setNextGPromise,
} from "./gPromisesSlice";

const Figure = styled.figure`
  margin: 0;
  background-color: #f0f0f0;
  font-family: "Quattrocento", serif;
  border-radius: 0.5rem;
  padding: 1.25em;
  width: clamp(320px, 90vw, 520px);
`;

const Blockquote = styled.blockquote`
  color: #000;
  line-height: 1.25em;
  font-size: 1.25rem;
`;

const Figcaption = styled.figcaption`
  margin-top: 1em;
  text-align: right;
  &::before {
    content: "—";
    margin-right: 0.25em;
  }
`;

const Footer = styled.footer`
  font-size: 0.85rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  & > button:not(:last-child) {
    margin-right: 1rem;
  }
`;

type GPromiseProps = {
  gPromise: GPromiseType;
};

export default function GPromiseContainer({ gPromise }: GPromiseProps) {
  const { t, i18n } = useTranslation();
  const { bibleId } = langs[i18n.language];
  const nextGPromise = useSelector(selectNextGPromise);
  const dispatch = useDispatch();
  const { data: randomGPromise } = useRandomGPromise();
  const queryClient = useQueryClient();
  const gPromises = useAppSelector(selectAllGPromises);

  const onNextClickHandler = () => {
    queryClient.refetchQueries("randomGPromise");
    if (!nextGPromise) {
      return;
    }
    if (!randomGPromise) {
      return;
    }

    let nextRandomGPromise = randomGPromise;
    if (nextGPromise.id === randomGPromise.id) {
      nextRandomGPromise =
        gPromises[Math.floor(Math.random() * gPromises.length)];
    }
    dispatch(setCurrentGPromise(nextGPromise));
    dispatch(setNextGPromise(nextRandomGPromise));
  };

  return (
    <article>
      <Figure>
        <Blockquote>{gPromise.content[bibleId]?.text}</Blockquote>
        <Figcaption>{gPromise.content[bibleId]?.reference}</Figcaption>
      </Figure>
      <Footer>
        <ButtonsWrapper>
          <Button onClick={onNextClickHandler}>
            <Twemoji emoji="⏩" /> {t("next")}
          </Button>
        </ButtonsWrapper>
      </Footer>
    </article>
  );
}
