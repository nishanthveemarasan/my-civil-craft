import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTestimonialData } from "@/store/reducer/actionReducer";
import { useEffect } from "react";
import TestimonialList from "@/components/TestimonialPage/TestimonialList";
import Spinner from "@/components/ui/Spinner";
import PageError from "@/components/Error/PageError";

const Testimonials = () => {
  const mapStateToProps = createSelector([
    (state: RootState) => state.testimonialStore.data,
    (state: RootState) => state.testimonialStore.loading,
    (state: RootState) => state.testimonialStore.error,
  ], (data, loading, error) => ({ list: data, loading, error }));

  const { list, loading, error } = useAppSelector(mapStateToProps);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTestimonialData());
  }, [dispatch]);
  console.log(list, loading, error);
  return <>
  {loading && <Spinner className="h-screen" />}
    {!loading && !error && list && list.length > 0 && <><section className="bg-primary text-primary-foreground py-20">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Testimonials</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl">What our clients say about working with us.</p>
      </div>
    </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialList list={list} />
          </div>
        </div>
      </section></>}
      {!loading && error && <PageError />}
  </>
};

export default Testimonials;
