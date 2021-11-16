function letterToColumn(letter: string) {
  return ["A", "B", "C"].indexOf(letter);
}

function rowToNumber(str: string) {
  return parseInt(str, 10) - 1;
}

export function cellLocation(str: string) {
  const letter = str.charAt(0);
  const rowNumberStr = str.substring(1);

  return {
    column: letterToColumn(letter),
    row: rowToNumber(rowNumberStr),
  };
}
