# Dropdown

## Props

- `options: {id: string, value: string, disabled: boolean}[]`: an array of objects for dropdown options. `id` identifies each object in the array and `name` is the value that is displayed. Optional third argument takes a `disabled` field, which disables that option in the dropdown.
- `width?: 'small' | 'medium' | 'large'`: 3 width options available. If not set, default will be 100% of its parent container.
- `height?: 'small' | 'medium' | 'large'`: 3 height options available. If not set, default will be 100% of its parent container. Note, if setting `label` to `'top'`, the default height will exceed its parent container - implement a custom label instead.
- `align?: 'left' | 'center' | 'right'`: aligns input text.
- `font?: 'small' | 'medium' | 'large'`: font size for input text.
- `bold?: boolean`: bold font-weight for input text.
- `label?: string`: label for dropdown.
- `labelPos?: 'left' | 'top'`: label position for dropdown.
- `blank?: boolean`: empty default option.
- `flex?: boolean`: converts label and select elements into flex items, with space between the two. The items will be spaced as far apart within the parent container.
- `loading?: boolean`: if program is busy, and the user can't interact with the interface, an hourglass or a watch will be displayed by the cursor.
- `disabled?: boolean`: disables the dropdown.
- `value?`: the selected value for the dropdown. If value is not given, the dropdown will use the first non-disabled option. To set a default value, use local state to initialize an option from your `options` array.
- `onChange: (e: React.ChangeEvent<HTMLSelectElement>)`: callback for executing an action.
- Any other native `HTMLSelectElement` attribute can be used.

## Examples

### Displaying a default option

```js
const options = [
  {id: 'foo', name: 'Foo'},
  {id: 'bar', name: 'Bar'},
  {id: 'baz', name: 'Baz'},
];

const [selected, setSelected] = useState(options[1].name); // default value will be 'Bar'

// ...

<Dropdown
  options={options}
  value={selected}
  onChange={(e) => {
    setSelected((e.target as HTMLSelectElement).value);
  }}
/>;
```

### Displaying a default, disabled option

```js
const options: {id: string, name: string, disabled?: boolean}[] = [
  {id: 'foo', name: 'Foo', disabled: true}, // disabled object
  {id: 'bar', name: 'Bar'},
  {id: 'baz', name: 'Baz'},
];

const [selected, setSelected] = useState(options[0].name); // default value will be 'Foo'

// ...

<Dropdown
  options={options}
  value={selected}
  onChange={(e) => {
    setSelected((e.target as HTMLSelectElement).value);
  }}
/>;
```

### Displaying a default, empty option

```js
const options = [
  {id: 'foo', name: 'Foo'},
  {id: 'bar', name: 'Bar'},
  {id: 'baz', name: 'Baz'},
];

const [selected, setSelected] = useState('');

// ...

<Dropdown
  options={options}
  value={selected}
  blank={true} // blank default
  onChange={(e) => {
    setSelected((e.target as HTMLSelectElement).value);
  }}
/>;
```
