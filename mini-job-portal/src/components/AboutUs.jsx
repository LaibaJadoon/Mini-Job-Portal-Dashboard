import React from "react";
import missionImg from "../assets/job-3d.png";
import valuesImg from "../assets/job-3d.png";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="bg-[#011c0d] text-[#F5F5DC] min-h-[60vh] px-20 md:px-36 py-10 flex flex-col justify-center space-y-10"
    >
      {/* Mission Section */}
     <div className="flex flex-col md:flex-row items-center justify-start gap-4 px-10 md:px-24">
  <img
    src={missionImg}
    alt="Our Mission"
    className="max-w-[200px] w-full h-auto rounded-lg shadow-lg"
  />
  <div className="max-w-xl ml-6">
    <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
    <p className="text-sm leading-relaxed">
      Our mission is to empower job seekers by connecting them with the right opportunities tailored to their aspirations.
      We strive to bridge the gap between talent and employers with ease, trust, and innovation.
      Through our platform, we aim to make career discovery seamless and meaningful.
      We are committed to guiding individuals toward fulfilling and impactful roles.
    </p>
  </div>
</div>

      {/* Values Section */}
<div className="flex flex-col md:flex-row-reverse items-center justify-start gap-4 px-10 md:px-24">
  <img
    src={valuesImg}
    alt="Our Values"
    className="max-w-[200px] w-full h-auto rounded-lg shadow-lg"
  />
  <div className="max-w-xl mr-6">
    <h2 className="text-2xl font-bold mb-2">Our Values</h2>
    <p className="text-sm leading-relaxed">
      Integrity, transparency, and dedication form the core of our values.
      We believe in creating meaningful experiences for both job seekers and companies by maintaining high standards of excellence and empathy.
      Our commitment drives us to foster trust and collaboration in every interaction.
      Together, we build a stronger and more inclusive job market.
    </p>
  </div>
</div>
    </section>
  );
}
