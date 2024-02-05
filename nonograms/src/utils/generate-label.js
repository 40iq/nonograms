import { generateElement } from './generate-elem';

export function generateLabel(config) {
  const label = generateElement('label', ['difficulty__label', `difficulty__label_${config.diff}`]);
  const input = generateElement(
    'input',
    ['difficulty__input'],
    undefined,
    'radio',
    config.diff,
    'difficulty',
    config.checked,
  );
  const inputSpan = generateElement('span', ['input__span']);
  const inputDesc = generateElement('span', ['input__descripiton'], config.desc);
  label.append(input, inputSpan, inputDesc);
  return [label, input];
}
