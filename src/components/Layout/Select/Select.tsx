import Select, { components } from "react-select";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const Control = (props: any) => (
  <components.Control {...props}>
    <MagnifyingGlassIcon className="ml-2 text-gray-400" height={26} />
    {props.children}
  </components.Control>
);

export const Option = (props: any) => (
  <components.Option {...props}>
    <div>
      <div className="font-semibold">{props.data.label}</div>
      {props.data.subtitle && (
        <div className="text-sm text-gray-500">{props.data.subtitle}</div>
      )}
    </div>
  </components.Option>
);

export const SingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <div>
      <div>{props.data.label}</div>
      {props.data.subtitle && (
        <div className="text-xs text-gray-500">{props.data.subtitle}</div>
      )}
    </div>
  </components.SingleValue>
);
