import { Building2, HardHat, Ruler, BarChart3, Award, Users, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchProfileData } from "@/store/reducer/actionReducer";
import Specialisation from "@/components/About/Specialisation";
import Experiences from "@/components/About/Experiences";
import Education from "@/components/About/Education";
import Background from "@/components/About/Background";
import Skills from "@/components/About/Skills";
import Spinner from "@/components/ui/Spinner";

const specializations = [
  { icon: Building2, title: "General Civil Engineering", desc: "Structural analysis, site development, and comprehensive engineering design." },
  { icon: HardHat, title: "Construction Management", desc: "Project planning, scheduling, supervision, and quality assurance." },
  { icon: Ruler, title: "Infrastructure", desc: "Roads, bridges, drainage, water supply, and public works." },
  { icon: BarChart3, title: "Quantity Surveying", desc: "Bill of quantities, cost estimation, tendering, and contract management." },
];

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "200+", label: "Clients Served" },
  { icon: Clock, value: "350+", label: "Projects Completed" },
  { icon: CheckCircle, value: "98%", label: "On-Time Delivery" },
];

const experience = [
  { period: "2018 – Present", role: "Senior Civil Engineer", company: "XYZ Engineering Consultants", desc: "Leading major infrastructure and construction management projects. Overseeing quantity surveying operations and mentoring junior engineers." },
  { period: "2013 – 2018", role: "Project Engineer", company: "ABC Constructions", desc: "Managed residential and commercial construction projects. Coordinated with stakeholders and ensured compliance with engineering standards." },
  { period: "2009 – 2013", role: "Junior Engineer", company: "Delta Infrastructure Ltd.", desc: "Assisted in road and bridge construction projects. Prepared engineering drawings and quantity estimates." },
];

const education = [
  { period: "2005 – 2009", degree: "B.Eng Civil Engineering", institution: "University of Engineering & Technology", desc: "Graduated with honors. Specialized in structural engineering and project management." },
];

const skills = [
  "Structural Analysis", "AutoCAD", "Project Management", "Cost Estimation",
  "Site Supervision", "Contract Management", "Quality Control", "Risk Assessment",
  "BIM Modeling", "Primavera P6", "MS Project", "Surveying",
];

const About = () => {
  const mapStateToProps = createSelector([
    (state: RootState) => state.profileStore.data,
    (state: RootState) => state.profileStore.loading,
    (state: RootState) => state.profileStore.error,
  ], (data, loading, error) => ({ data, loading, error }));

  const { data, loading, error } = useAppSelector(mapStateToProps);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);
  console.log(data, loading, error);
  return <div>
    {loading && <Spinner className="h-screen" />}
    {!loading && data && <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">Passionate civil engineer with over 15+ years of experience delivering quality engineering solutions.</p>
        </div>
      </section>

      <Background data={data.profile} />

      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-display font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Specialisation list={data.services} />

      <Experiences list={data.experiences} />

      <Education list={data.educations} />

      <Skills list={data.skills} />
    </>}

  </div>
};

export default About;
