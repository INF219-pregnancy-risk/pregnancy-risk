import LinkButton from "@/components/inputs/buttons/LinkButton";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-popover text-popover-foreground rounded-lg mt-8 shadow-md border p-8 h-min">
      <h1 className="text-3xl font-semibold mb-4">About Us</h1>
      <p className="mb-6">
        PregnancyRisk is a Norwegian developed webservice and your trusted
        source for pregnancy-related risk assessments. We are a passionate team
        of students from the University of Bergen (UiB), working closely with
        Prof. Anagha Madhusudan Joshi-Michoel.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
      <p className="mb-6">
        Our mission is to provide accurate, science-backed information to
        expectant parents. The platform is built on the foundation of scientific
        research and proven medical insights to provide you with the most
        reliable information. Our platform offers a survey-based service that
        enables users to assess their risk levels for various pregnancy-related
        complications.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Technology & Stack</h2>
      <p className="mb-6">
        Our stack is built using React with TypeScript and Tailwind CSS,
        complemented by front-end libraries such as Material-UI and ShadUI for
        enhanced interactivity and design.
        <span className="font-semibold">
          The information collected through the surveys is not stored
        </span>{" "}
        and used solely for the purpose of you calculating your risk assessment
        score.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p className="gap-2 mb-2">
        For any questions or feedback, please contact us at:
        <div className="mt-1">
          <LinkButton
            href="mailto:Anagha.Joshi@uib.no"
            variant={"link"}
            size={"min"}
            icon={<EmailOutlinedIcon />}
          >
            Anagha.Joshi@uib.no
          </LinkButton>
        </div>
      </p>
    </div>
  );
};

export default AboutPage;
