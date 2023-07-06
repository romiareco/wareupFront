import { styled } from '@mui/material';
import { Fragment } from 'react';
import {LogisticBanner, TopHomeBar, WhoWeAre} from "../../components/Home";
import { StickyFooter } from "../../components";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

//TODO: agregar en algun lado llamado al botón Contactarnos (Cuando tengamos más claro como va a ser esta página, pero lo dejo anotado para no olvidarnos)
export function Welcome() {
  return (
    <Fragment>
      <ContentBox className="home">
        <TopHomeBar />
        <LogisticBanner />
        <WhoWeAre />
        <StickyFooter />
      </ContentBox>
    </Fragment>
  );
};