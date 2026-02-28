import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import ContactForm from "@/components/ContactPage/ContactForm";
import MyCard from "@/components/templates/MyCard";
import ContactDetails from "@/components/ContactPage/ContactDetails";
import { useEffect } from "react";
import { fetchContactData } from "@/store/reducer/actionReducer";
import Spinner from "@/components/ui/Spinner";
import PageError from "@/components/Error/PageError";
const Contact = () => {
  const mapStateToProps = createSelector([
    (state: RootState) => state.contactStore.data,
    (state: RootState) => state.contactStore.loading,
    (state: RootState) => state.contactStore.error,
  ], (data, loading, error) => ({ contact: data, loading, error }));

  const { contact, loading, error } = useAppSelector(mapStateToProps);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContactData());
  }, [dispatch]);


  return (
    <div>
      {/* {loading && <Spinner className="className" />}
      {!loading && !error && contact && <><section className="bg-primary text-primary-foreground py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">Have a project in mind? Let's discuss how I can help.</p>
        </div>
      </section>

        <section className="py-16">

          <div className="container">
            <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
              <div className="lg:col-span-2 space-y-6">
                <ContactDetails />
              </div>

              <MyCard cardCalss="lg:col-span-3" contentClass="pt-6">
                <ContactForm />

              </MyCard>
            </div>
          </div>
        </section></>}
        {!loading && error && <PageError />} */}
         <ContactForm />
    </div>
  );
};

export default Contact;
