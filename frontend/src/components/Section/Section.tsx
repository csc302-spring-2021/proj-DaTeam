import { SDCSection } from "@dateam/shared";

function Section(props: { children?: any; sdcSection: SDCSection }) {
  return (
    <section data-testid="section">
      <h3 id="section-title" className="text-2xl font-bold pb-4">
        {props.sdcSection.title}
      </h3>
      {props.children}
    </section>
  );
}

export default Section;
