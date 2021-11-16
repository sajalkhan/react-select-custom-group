import React, { useState } from 'react';
import { Selects } from './components/selects';
import { Date as DateView } from './utils/date';
import { groupedOptions } from './data/data';
import Modal from './components/modal';
import { WysiwygEditorV5 } from './components/wysiwyg-editor-v5';
import './index.scss';
export interface OptionTypes {
  label: string;
  value: string;
  alert?: boolean;
}

const App = () => {
  const [items, setSelectedItems] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [data, setData] = useState<string>('');

  const openModal = (value: string, open: boolean) => {
    setModalOpen(open);
    setMessage(value);
  };

  const handleSelecteditems = (optionSelected: any) => {
    let items: string[] = [];
    optionSelected.forEach((item: OptionTypes) => {
      items.push(item.value);
    });

    setSelectedItems(items);
  };

  return (
    <div className="p-react-select">
      <div className="p-react-select__date">
        <div>
          <span>Japan Time:</span> <DateView date={new Date()} timeZone="Asia/Tokyo" />
        </div>
        <div>
          <span>Bangladesh Time:</span> <DateView date={new Date()} timeZone="Asia/Dhaka" />
        </div>
        <div>
          <span>America Time:</span> <DateView date={new Date().toISOString()} timeZone="America/New_York" />
        </div>
      </div>

      <Selects
        groupedOptions={groupedOptions}
        placeholder="選択してください。"
        handleModal={e => openModal(e, true)}
        onChange={handleSelecteditems}
        // disabled={true}
        // defaultItems={[groupedOptions[0]?.options[0], groupedOptions[1]?.options[0]]}
      />

      <label className="p-react-select__label">Selected Items:</label>
      {items.map((i: string, indx: number) => (
        <ul key={indx}>
          <li className="p-react-select__item">{i}</li>
        </ul>
      ))}

      <div className="p-ckeditor">
        <WysiwygEditorV5
          size="large"
          value={data}
          onChange={value => {
            setData(value);
          }}
        />
      </div>

      {modalOpen && <Modal message={message} openModal={openModal} />}
    </div>
  );
};

export default App;
