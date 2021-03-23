import { Model } from "@dateam/shared";

function Section(props: { children?: any; sdcSection: Model.SDCSection }) {
  return (
    <section data-testid="section">
      <h3 id="section-title" className="pb-4 my-2 text-2xl font-bold">
        {props.sdcSection.title}
      </h3>
      {props.children}
    </section>
  );
}

export default Section;
