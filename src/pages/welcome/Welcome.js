import { Fragment } from 'react';
import { TopHomeBar} from "../../components/Home";
import { Footer } from "../../components/Footer";
import { HowItWorks, ValueProposal, Slogan, GeographicSearcher, WorkingWithUs } from "../../components/Home";
import { DepositsMap } from '../../components/Maps';

export function Welcome() {
  return (
    <Fragment>
        <TopHomeBar />
        <DepositsMap cityId={"Aguada"} departmentId={"Montevideo"}/>
        <GeographicSearcher />
        <Slogan />
        <HowItWorks />
        <ValueProposal />
        <WorkingWithUs />
        <Footer />
    </Fragment>
  );
};