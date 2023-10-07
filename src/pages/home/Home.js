import React, { Fragment } from "react";
import { Footer } from "../../components/Footer";
import {
  HowItWorks,
  PrincipalSearcher,
  Slogan,
  ValueProposal,
  WorkingWithUs,
} from "../../components/Home";

export function Home() {
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
}
