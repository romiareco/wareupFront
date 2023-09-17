import { Fragment } from 'react';
import { TopHomeBar} from "../../components/Home";
import { Footer } from "../../components/Footer";
import { HowItWorks, ValueProposal, Slogan, GeographicSearcher, WorkingWithUs } from "../../components/Home";
import { GoogleMaps } from '../../components/Maps/GoogleMaps';

export function Welcome() {
  return (
    <Fragment>
        <TopHomeBar />
        <GoogleMaps />
        <GeographicSearcher />
        <Slogan />
        <HowItWorks />
        <ValueProposal />
        <WorkingWithUs />
        <Footer />
    </Fragment>
  );
};