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
import PageError from "@/components/Error/PageError";

const stats = [
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Users, value: "50+", label: "Clients Served" },
  { icon: Clock, value: "20+", label: "Projects Completed" },
  { icon: CheckCircle, value: "98%", label: "On-Time Delivery" },
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
  return <div>
    {loading && <Spinner className="h-screen" />}
    {!loading && !error && data && <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <div className="text-primary-foreground/80 text-lg max-w-2xl" dangerouslySetInnerHTML={{__html:data.profile.bottom_line}}/>
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
    {!loading && error && <PageError />}

  </div>
};

export default About;
