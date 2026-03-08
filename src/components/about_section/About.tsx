import React from "react";
import { info } from "../../data/info";
import Education from "./Education";
import Experience from "./Experience";

interface AboutProps {
  about: (typeof info)["about"];
}

export default function About(props: AboutProps) {
  const { about } = props;

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <div className="flex flex-col space-y-4 lg:w-[80vw]  lg:mb-10 mb-2 mx-4">
        <h1 className="text-4xl font-bold">About me</h1>
        <p className="text-2xl font-normal">{info.about.description}</p>
      </div>
      <Experience experience={about.experience} />
      <Education education={about.education} />
    </div>
  );
}
