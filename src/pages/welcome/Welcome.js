import { Fragment } from 'react';
import { Footer } from "../../components/Footer";
import { HowItWorks, ValueProposal, Slogan, PrincipalSearcher, WorkingWithUs } from "../../components/Home";

export function Welcome() {
  return (
    <Fragment>
        <PrincipalSearcher />
        <Slogan />
        <HowItWorks />
        <ValueProposal />
        <WorkingWithUs />
        <Footer />
    </Fragment>
  );
};