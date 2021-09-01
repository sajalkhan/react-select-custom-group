import React from "react";
import { Selects } from "./components/selects";
import { groupedOptions } from "./data/data";

const App = () => {
  const openModal = () => {
    alert("click -- ");
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
        groupedOptions={groupedOptions}
        placeholder="Please Select.."
        modifiers="invalid"
      />
    </div>
  );
};

export default App;
