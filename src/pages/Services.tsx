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

const services = [
  {
    icon: Building2,
    title: "General Civil Engineering",
    desc: "Comprehensive civil engineering solutions covering structural analysis, site development, foundation design, and geotechnical assessments.",
    features: ["Structural Design & Analysis", "Site Development Planning", "Foundation Engineering", "Geotechnical Assessments", "Environmental Compliance"],
  },
  {
    icon: HardHat,
    title: "Construction Management",
    desc: "End-to-end project oversight ensuring every phase is delivered on time, within budget, and to the highest quality standards.",
    features: ["Project Planning & Scheduling", "Cost Control & Budgeting", "Quality Assurance", "Risk Management", "Contractor Coordination"],
  },
  {
    icon: Ruler,
    title: "Infrastructure Development",
    desc: "Planning, designing, and executing public and private infrastructure including roads, bridges, water systems, and utilities.",
    features: ["Road & Highway Design", "Bridge Engineering", "Water Supply Systems", "Drainage & Sewerage", "Utility Infrastructure"],
  },
  {
    icon: BarChart3,
    title: "Quantity Surveying",
    desc: "Accurate cost estimation, tendering, procurement management, and financial oversight throughout the project lifecycle.",
    features: ["Cost Estimation & BOQ", "Tender Documentation", "Procurement Management", "Interim Valuations", "Final Account Settlement"],
  },
];

const Services = () => {
  const mapStateToProps = createSelector([
    (state: RootState) => state.serviceStore.data,
    (state: RootState) => state.serviceStore.loading,
    (state: RootState) => state.serviceStore.error,
  ], (data, loading, error) => ({ list: data, loading, error }));

  const { list, loading, error } = useAppSelector(mapStateToProps);
  console.log(list, loading, error);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchServicesData());
  }, [dispatch]);
  return (
    <div>
      <ServiceHeader />

      <ServiceList list={list} />

      <ServiceFooter />
    </div>
  );
};

export default Services;
