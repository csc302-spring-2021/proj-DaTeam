import { Model } from "@dateam/shared";

function TextField({ sdcTextField }: { sdcTextField: Model.SDCTextField }) {
  return (
    <div
      data-testid="textfield"
      className="py-4 text-lg font-bold rounded-lg "
    >
      {sdcTextField.title}
    </div>
  );
}

export default TextField;
