import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

function CommonForm({
  formControls,
  buttonText,
  formData,
  setFormData,
  onSubmit,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "radio":
        element = (
          <RadioGroup
            value={value}
            onValueChange={(value) => {
              // Update form state when selection changes
              setFormData((formData) => ({
                ...formData,
                [getControlItem.name]: value,
              }));
            }}
          >
            {getControlItem.options?.map((optionItem) => (
              <div key={optionItem.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={optionItem.value}
                  id={`${getControlItem.name}-${optionItem.value}`}
                />
                <Label htmlFor={`${getControlItem.name}-${optionItem.value}`}>
                  {optionItem.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        break;
      case "checkbox":
        element = (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value} // Make sure this is boolean
              onCheckedChange={(checked) => {
                setFormData((formData) => ({
                  ...formData,
                  [getControlItem.name]: checked, // Use boolean value
                }));
              }}
              id={getControlItem.name}
            />
            <Label htmlFor={getControlItem.name}>
              {getControlItem.placeholder}
            </Label>
          </div>
        );
        break;
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5 " key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
