import { Briefcase, GraduationCap, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const Resume = () => (
  <div>
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
          <p className="text-primary-foreground/80 text-lg">My professional experience, education, and skills.</p>
        </div>
        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Download className="mr-2 h-4 w-4" /> Download CV
        </Button>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-4xl space-y-16">
        {/* Experience */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className="space-y-6 border-l-2 border-primary/20 pl-6">
            {experience.map((e) => (
              <Card key={e.period}>
                <CardContent className="pt-6">
                  <Badge variant="outline" className="mb-2">{e.period}</Badge>
                  <h3 className="font-display text-xl font-semibold">{e.role}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{e.company}</p>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="border-l-2 border-primary/20 pl-6">
            {education.map((e) => (
              <Card key={e.period}>
                <CardContent className="pt-6">
                  <Badge variant="outline" className="mb-2">{e.period}</Badge>
                  <h3 className="font-display text-xl font-semibold">{e.degree}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{e.institution}</p>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <Badge key={s} variant="secondary" className="text-sm py-1.5 px-4">{s}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Resume;
