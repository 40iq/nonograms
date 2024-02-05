export function generateElement(
  tag,
  classes = undefined,
  content = undefined,
  type = undefined,
  id = undefined,
  name = undefined,
  checked = undefined,
) {
  const elem = document.createElement(tag);
  if (classes !== undefined) {
    classes.forEach((className) => {
      elem.classList.add(className);
    });
  }
  if (content !== undefined) {
    elem.textContent = content;
  }
  if (type !== undefined) {
    elem.setAttribute('type', type);
  }
  if (id !== undefined) {
    elem.setAttribute('id', id);
  }
  if (name !== undefined) {
    elem.setAttribute('name', name);
  }
  if (checked !== undefined) {
    elem.checked = true;
  }

  return elem;
}
