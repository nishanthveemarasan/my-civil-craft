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

const services = [
  { icon: Building2, title: "General Civil Engineering", desc: "Comprehensive civil engineering solutions from structural design to site development." },
  { icon: HardHat, title: "Construction Management", desc: "End-to-end project oversight ensuring on-time, on-budget delivery." },
  { icon: Ruler, title: "Infrastructure", desc: "Roads, bridges, water systems, and public infrastructure planning and execution." },
  { icon: BarChart3, title: "Quantity Surveying", desc: "Accurate cost estimation, budgeting, and financial management for projects." },
];

const carouselImages = [
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=500&fit=crop", alt: "Construction site with crane", caption: "Large-Scale Construction" },
  { src: "https://images.unsplash.com/photo-1545296664-39db56ad95bd?w=1200&h=500&fit=crop", alt: "Highway bridge", caption: "Highway Infrastructure" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=500&fit=crop", alt: "Modern building", caption: "Commercial Development" },
  { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=500&fit=crop", alt: "Building under construction", caption: "Ongoing Projects" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=500&fit=crop", alt: "Water treatment facility", caption: "Water Infrastructure" },
];

const projects = [
  { title: "Highway Overpass Bridge", category: "Infrastructure", location: "Metro City", image: "https://images.unsplash.com/photo-1545296664-39db56ad95bd?w=600&h=400&fit=crop" },
  { title: "Commercial Complex", category: "Construction Management", location: "Downtown", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop" },
  { title: "Residential Tower", category: "General Civil", location: "Riverside", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop" },
  { title: "Water Treatment Plant", category: "Infrastructure", location: "Industrial Zone", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop" },
  { title: "Shopping Mall Renovation", category: "Quantity Surveying", location: "City Center", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop" },
  { title: "Municipal Road Network", category: "Infrastructure", location: "Suburbs", image: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=600&h=400&fit=crop" },
];

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
