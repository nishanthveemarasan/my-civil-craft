import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServiceFooter = () => {
    return <section className="py-20 bg-muted">
        <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need Engineering Expertise?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Get in touch to discuss your project requirements and how we can help bring your vision to life.
            </p>
            <Button size="lg" asChild>
                <Link to="/contact">Get a Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
    </section>
}
export default ServiceFooter;