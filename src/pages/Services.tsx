import { Building2, HardHat, Ruler, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchServicesData } from "@/store/reducer/actionReducer";
import ServiceHeader from "@/components/ServicePage/ServiceHeader";
import ServiceFooter from "@/components/ServicePage/ServiceFooter";
import ServiceList from "@/components/ServicePage/ServiceList";
import Spinner from "@/components/ui/Spinner";
import PageError from "@/components/Error/PageError";


const Services = () => {
  const mapStateToProps = createSelector([
    (state: RootState) => state.serviceStore.data,
    (state: RootState) => state.serviceStore.loading,
    (state: RootState) => state.serviceStore.error,
  ], (data, loading, error) => ({  data, loading, error }));

  const { data, loading, error } = useAppSelector(mapStateToProps);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchServicesData());
  }, [dispatch]);
  return (
    <>
      {loading && <Spinner className="h-screen" />}
      {!loading && !error && data && <>
        <ServiceHeader year={data.year_of_experience} />

        <ServiceList list={data.services} />

        <ServiceFooter />
      </>}
      {!loading && error && <PageError />}
    </>
  );
};

export default Services;

