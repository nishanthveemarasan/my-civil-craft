import { Building2, HardHat, Ruler, BarChart3, Award, Users, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

const About = () => (
  <div>
    {/* Hero */}
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl">Passionate civil engineer with over 15 years of experience delivering quality engineering solutions.</p>
      </div>
    </section>

    {/* Bio */}
    <section className="py-16">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">Professional Background</h2>
        <div className="prose prose-lg text-muted-foreground space-y-4">
          <p>With a strong foundation in civil engineering and a passion for building lasting infrastructure, I have dedicated my career to delivering projects that stand the test of time. My expertise spans across general civil engineering, construction management, infrastructure development, and quantity surveying.</p>
          <p>I hold a Bachelor's degree in Civil Engineering and am a registered professional engineer. Throughout my career, I've had the privilege of working on projects ranging from residential developments to large-scale infrastructure programs.</p>
          <p>My approach combines technical precision with practical problem-solving, ensuring every project is delivered on time, within budget, and to the highest standards of quality and safety.</p>
        </div>
      </div>
    </section>

    {/* Stats */}
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

    {/* Specializations */}
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Specializations</h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {specializations.map((s) => (
            <Card key={s.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="flex gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
