import { SDCDisplayItem } from "@dateam/shared";

function DisplayItem({ sdcDisplayitem }: { sdcDisplayitem: SDCDisplayItem }) {
  return (
    <div
      data-testid="displayitem"
      className="py-4 text-lg font-bold rounded-lg "
    >
      {sdcDisplayitem.title}
    </div>
  );
}

export default DisplayItem;
