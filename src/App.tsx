import React from 'react';
import './App.css';
import { useForm, FormContext } from 'react-hook-form';
import { InputYesNoButtonSelector } from './InputYesNoButtonSelector';
import { InputMultiSelectBox } from './InputMultiSelectBox';
import { InputTextBox } from './InputTextBox';

export interface IDtoExample {
  bool1: boolean;
  selectedItems: Array<number>;
  textValue: string;
};

export interface ISelectable {
  id: number;
  name: string;
}

const defaultVal: IDtoExample = {
  bool1: true,
  selectedItems: [3],
  textValue: ""
};

function nameof<T>(property: keyof T): keyof T {
  return property;
}

async function delay(ms: number): Promise<void>
{
  return await new Promise(resolve => setTimeout(resolve, ms));
}

const App: React.FC = () => {

  const selectables: Array<ISelectable> = [
   {id: 1, name: "Item 1"} ,
   {id: 2, name: "Item 2"} ,
   {id: 3, name: "Item 3"} 
  ]

  const form = useForm<IDtoExample>({
    defaultValues: defaultVal
  })

  const selectableWatcher:Array<number> = form.watch("selectedItems");

  async function submit(dto: IDtoExample): Promise<void> {
    console.log(dto);
  }

  return (
    <div className="App">
      <div className="col">
        <FormContext {...form} >
          <form onSubmit={form.handleSubmit(submit)}>

            <InputYesNoButtonSelector
              label="Example selector"
              name={nameof<IDtoExample>("bool1")}
            />

            <InputMultiSelectBox 
              label="Selectable"
              items={selectables}
              name={nameof<IDtoExample>("selectedItems")}
              settings={{
                textProperty: nameof<ISelectable>("name"),
                valueProperty: nameof<ISelectable>("id")
              }}
            />

            {selectableWatcher.includes(2) && (
              <InputTextBox
                label="Optional text entry"
                name={nameof<IDtoExample>("textValue")}
              />
            )}

            <p>Selected items: {selectableWatcher.toString()}</p>

            <button type="submit">Submit</button>
          </form>
        </FormContext>
      </div>
      <div className="col">
              <ol>
                <li>Set checkbox to 'no'</li>
                <li>Select item 1 from select box</li>
                <li>Select item 2 from select box</li>
                <li>Conditional field will now appear as item 2 is selected</li>
                <li>Type anything into the text box</li>
                <li>Remove item 2 from select box</li>
                <li>Add item 2 back into the select box</li>
                <li>Type into the text box and watch the form reset</li>
              </ol>
      </div>
    </div>
  );
}

export default App;
