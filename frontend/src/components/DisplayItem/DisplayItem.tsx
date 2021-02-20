import { Model } from "@dateam/shared";

function DisplayItem({
  sdcDisplayitem,
}: {
  sdcDisplayitem: Model.SDCDisplayItem;
}) {
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
