import React from "react";

const TopicsLearning = () => {
  return (
    <section id="about">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      I am currently learning
    </h2>
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>Cloud Engineering concepts such as DNS, VPC</li>
      <li>Zest Protocol on Stacks L2</li>
    </ul>
    </section>
  );
};

export default TopicsLearning;
