import { ContactForm } from "../../components/Forms/ContactForm";
import { useEffect } from "react";

export function Contact() {
  useEffect(() => {
    document.title = "Contactanos";
  }, []);

  return <ContactForm />;
}
