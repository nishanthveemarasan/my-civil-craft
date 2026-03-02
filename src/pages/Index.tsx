import { Link } from "react-router-dom";
import { Building2, HardHat, Ruler, BarChart3, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import heroBg from "@/assets/hero-bg.jpg";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchHomeData } from "@/store/reducer/actionReducer";
import Services from "@/components/HomePage/Services";
import Projects from "@/components/HomePage/Projects";
import HomeFooter from "@/components/HomePage/HomeFooter";
import CarouselImages from "@/components/HomePage/CarouselImages";
import HomeHeader from "@/components/HomePage/HomeHeader";
import Spinner from "@/components/ui/Spinner";
import PageError from "@/components/Error/PageError";



const Index = () => {
  const mapStateToProps = createSelector([
    (state: RootState) => state.homeStore.data,
    (state: RootState) => state.homeStore.loading,
    (state: RootState) => state.homeStore.error,
  ], (data, loading, error) => ({ data, loading, error }));

  const { data, loading, error } = useAppSelector(mapStateToProps);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);
  return (
    <>
      {loading && <Spinner className="h-screen" />}
      {!loading && !error && data && <>
        <HomeHeader data={data.content} year={data.year_of_experience} />
        <CarouselImages list={data.content.images} />

        <Services list={data.services} />

        <Projects list={data.projects} />
        <HomeFooter />
      </>}
      {!loading && error && <PageError />}

    </>
  );
};

export default Index;
