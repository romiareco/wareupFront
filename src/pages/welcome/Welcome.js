import { Fragment } from 'react';
import { TopHomeBar} from "../../components/Home";
import { Footer } from "../../components/Footer";
import { HowItWorks, ValueProposal, Slogan, GeographicSearcher, WorkingWithUs } from "../../components/Home";

export function Welcome() {
  return (
    <Fragment>
        <TopHomeBar />
        <GeographicSearcher />
        <Slogan />
        <HowItWorks />
        <ValueProposal />
        <WorkingWithUs />
        <Footer />
    </Fragment>
  );
};