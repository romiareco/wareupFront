import React, { Fragment, useEffect } from "react";
import { Footer } from "../../components/Footer";
import {
  HowItWorks,
  PrincipalSearcher,
  Slogan,
  ValueProposal,
  WorkingWithUs,
} from "../../components/Home";

export function Home() {
  useEffect(() => {
    document.title = "Ware Up";
  }, []);

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
