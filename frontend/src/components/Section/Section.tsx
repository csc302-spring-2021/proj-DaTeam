import { SDCSection } from "@dateam/shared";

function Section(props: {children?: any, sdcSection: SDCSection}) {
    return (
        <div data-testid="section" className="px-8 py-4">
            <div id="section-title" className="text-2xl font-bold py-6">
                {props.sdcSection.title}
            </div>
            {props.children}
        </div>
    );
}

export default Section;