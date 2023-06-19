import { styled } from '@mui/material';
import { Fragment } from 'react';
import {LogisticBanner, TopHomeBar, WhoWeAre} from "../../components/Home";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

export function Home() {
  return (
    <Fragment>
      <ContentBox className="home">
        <TopHomeBar />
        <LogisticBanner />
        <WhoWeAre />
      </ContentBox>
    </Fragment>
  );
};