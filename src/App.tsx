import React from "react";
import { Selects } from "./components/selects";
import { groupedOptions } from "./data/data";

export interface OptionTypes {
  label: string;
  value: string;
  alert?: boolean;
}

const App = () => {
  const [items, setSelectedItems] = React.useState<string[]>([]);

  const openModal = (value: string) => {
    alert(value);
  };

  const handleSelecteditems = (optionSelected: any) => {
    let items: string[] = [];
    optionSelected.forEach((item: OptionTypes) => {
      items.push(item.value);
    });

    setSelectedItems(items);
  };

  return (
    <div style={{ marginTop: "10%", padding: "50px" }}>
      <Selects
        groupedOptions={groupedOptions}
        placeholder="選択してください。"
        handleModal={openModal}
        defaultItems={[
          groupedOptions[0]?.options[0],
          groupedOptions[1]?.options[0],
        ]}
      />
      <br />

      <Selects
        groupedOptions={groupedOptions}
        placeholder="Please Select.."
        disabled={true}
        defaultItems={[
          groupedOptions[0]?.options[0],
          groupedOptions[1]?.options[0],
        ]}
      />
      <br />

      <Selects
        onChange={handleSelecteditems}
        groupedOptions={groupedOptions}
        placeholder="Please Select.."
        modifiers="invalid"
      />
      <br />

      <label style={{ color: "green", fontSize: "20px" }}>
        Selected Items:
      </label>
      {items.map((i: string, indx: number) => (
        <ul key={indx}>
          <li style={{ fontWeight: "bold" }}>{i}</li>
        </ul>
      ))}
      <br />
    </div>
  );
};

export default App;
