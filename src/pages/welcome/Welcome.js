import { Fragment } from 'react';
import { TopHomeBar} from "../../components/Home";
import { Footer } from "../../components/Footer";
import { HowItWorks, ValueProposal, Slogan, DepositManager, Searcher, WorkingWithUs } from "../../components/Home";

//TODO: agregar en algun lado llamado al botón Contactarnos (Cuando tengamos más claro como va a ser esta página, pero lo dejo anotado para no olvidarnos)
export function Welcome() {
  return (
    <Fragment>
        <TopHomeBar />
        <Searcher />
        <Slogan />
        <HowItWorks />
        <ValueProposal />
        <DepositManager />
        <WorkingWithUs />
        <Footer />
    </Fragment>
  );
};