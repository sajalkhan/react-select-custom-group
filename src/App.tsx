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

  const openModal = () => {
    alert("click -- ");
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
        onChange={handleSelecteditems}
        groupedOptions={groupedOptions}
        placeholder="選択してください。"
        handleModal={openModal}
        defaultItems={[
          groupedOptions[0]?.options[0],
          groupedOptions[1]?.options[0],
        ]}
      />
      <br />
      <label>Selected Items: </label>

      {items.map((i: string, indx: number) => (
        <p key={indx}>
          <b>{i}</b>
        </p>
      ))}
      <br />
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
        groupedOptions={groupedOptions}
        placeholder="Please Select.."
        modifiers="invalid"
      />
    </div>
  );
};

export default App;
