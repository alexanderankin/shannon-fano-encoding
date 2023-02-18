export function codesMap(input) {
  let length = input.length;
  let frequencies = frequenciesOfCharactersInString(input);
  let probabilities = frequenciesToProbabilities(frequencies, length);
  let sortedKeys = Array.from(frequencies.keys()).sort((a, b) => a - b);
  return shannonValuesOfKeys(sortedKeys);
}

export function codes(input) {
  return Object.fromEntries(codesMap(input));
}

function frequenciesOfCharactersInString(input) {
  const map = new Map();
  for (const char of input) {
    const count = map.get(char) || 0
    map.set(char, count + 1)
  }

  return map
}

function frequenciesToProbabilities(frequencies, length) {
  const map = new Map();
  for (const entry of frequencies.entries()) {
    map.set(entry[0], entry[1] / length)
  }
  return map;
}

function shannonValuesOfKeys(keys) {
  return new Map(shannonValuesHelper(keys.slice(0, 2), '0')
    .concat(shannonValuesHelper(keys.slice(2), '1')))
}

function shannonValuesHelper(keys, prefix) {
  if (keys.length === 0) return []

  let left = [keys[0], prefix + '0']
  if (keys.length === 1) return [left];
  if (keys.length === 2) return [left, [keys[1], prefix + '1']];

  return [left, ...shannonValuesHelper(keys.slice(1), prefix + '1')]
}

function encodeStringWithShannonValues(input, shannonValues) {
  return input.split('').map(char => shannonValues.get(char)).join('');
}

export function encode(input) {
  let shannonValues = codesMap(input);
  return encodeStringWithShannonValues(input, shannonValues);
}

function stringLengthWithShannonValues(input, shannonValues) {
  return input.split('').reduce((acc, char) => acc + shannonValues.get(char).length, 0);
}

export function length(input) {
  let shannonValues = codesMap(input);
  return stringLengthWithShannonValues(input, shannonValues);
}

export function decode(input, codeValues) {
  if (!(codeValues instanceof Map)) {
    codeValues = new Map(Object.entries(codeValues));
  }

  let array = Array.from(codeValues.entries())
  let output = ''

  while (input.length) {
    var found = false;
    for (let coding of array) {
      let [clearText, codedText] = coding;
      if (input.startsWith(codedText)) {
        output += clearText
        input = input.slice(codedText.length)
        found = true;
      }
    }

    if (!found)
      throw new Error('none of the codings matched, malformed input string')
  }

  return output;
}
