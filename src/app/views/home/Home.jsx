import { styled } from '@mui/material';
import { Fragment } from 'react';
import TopHomeBar from './TopHomeBar';
import WhoWeAre from './WhoWeAre';
import LogisticBanner from './LogisticBanner';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Home = () => {
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

export default Home;
