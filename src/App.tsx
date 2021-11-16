import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import "./App.css";
import {
  cell,
  CellLocation,
  Spreadsheet,
  SpreadsheetCell,
} from "./spreadsheet";
import { produce } from "immer";
import { calculateInSpreadsheet } from "./spreadsheet/calculate";

const INITIAL_SPREADSHEET: Spreadsheet = [
  ["1", "2", "3"],
  ["=A1", "=B1+A2*A3", "5"],
  ["=B2*20", "10", "=C2*10"],
];

const width = 164;

function Cell({
  spreadsheet,
  row,
  column,
  onChange,
}: {
  spreadsheet: Spreadsheet;
  row: CellLocation["row"];
  column: CellLocation["column"];
  onChange: (location: CellLocation, newContent: SpreadsheetCell) => void;
}) {
  const [active, setActive] = useState(false);

  const update = useCallback(
    (content: SpreadsheetCell) => {
      onChange({ row, column }, content);
      setActive(false);
    },
    [row, column, onChange]
  );

  const change = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newContent = event.target.value;
      update(newContent);
    },
    [update]
  );

  const keyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;

      const newContent = (event.target as HTMLInputElement).value;
      update(newContent);
    },
    [update]
  );

  const rawContent = useMemo(
    () => cell(spreadsheet, { row, column }),
    [spreadsheet, row, column]
  );

  const calculatedContent = useMemo(
    () => calculateInSpreadsheet(spreadsheet, rawContent),
    [spreadsheet, rawContent]
  );

  if (active) {
    return (
      <input
        type="text"
        defaultValue={rawContent}
        onBlur={change}
        onKeyPress={keyPress}
        autoFocus
        style={{ width }}
      />
    );
  }

  return (
    <button onClick={() => setActive(true)} style={{ width }}>
      {calculatedContent}
    </button>
  );
}

function App() {
  const [spreadsheet, setSpreadsheet] = useState(INITIAL_SPREADSHEET);

  const setSpreadsheetCell = useCallback(
    (location: CellLocation, newContent: SpreadsheetCell) => {
      setSpreadsheet((currentSpreadsheet) =>
        produce(currentSpreadsheet, (draft) => {
          draft[location.column][location.row] = newContent;
        })
      );
    },
    [setSpreadsheet]
  );

  return (
    <div className="App">
      <div
        style={{
          marginLeft: 170,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <div style={{ width }}>A</div>
        <div style={{ width }}>B</div>
        <div style={{ width }}>C</div>
      </div>

      {spreadsheet.map((rowValues, column) => (
        <div
          key={column}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div>{column + 1}</div>

          {rowValues.map((_, row) => (
            <Cell
              key={`${column}-${row}`}
              spreadsheet={spreadsheet}
              row={row}
              column={column}
              onChange={setSpreadsheetCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
