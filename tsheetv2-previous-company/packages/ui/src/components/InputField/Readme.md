# InputField

## Props

- `width?: 'small' | 'medium' | 'large'`: 3 width options available. If not set, default will be 100% of its parent container.
- `height?: 'small' | 'medium' | 'large'`: 3 height options available. If not set, default will be 100% of its parent container. Note, if setting `label` to `'top'`, the default height will exceed its parent container - implement a custom label instead.
- `align?: 'left' | 'center' | 'right'`: aligns input.
- `font?: 'small' | 'medium' | 'large'`: font size.
- `bold?: boolean`: bold font-weight for input text.
- `label?: string`: label title for input field.
- `labelPos?: 'left' | 'top'`: label position for input field.
- `flex?: boolean`: converts label and select elements into flex items, with space between the two. The items will be spaced as far apart within the parent container.
- `multi?: boolean`: converts input element to textarea element. When set, you can specify the height of the input via the `rows` attribute.
- `disabled?: boolean`: disables the input.
- `value?`: the displayed value for the input. To set a default value, use local state to initialize a value.
- `onChange: (e: React.ChangeEvent<HTMLSelectElement>)`: callback for executing an action.
- Any other native `HTMLInputElement` or `HTMLTextAreaElement` attribute can be used.

```js
// INPUT COMPONENT
const [value, setSValue] = useState('');

return (
  <form>
    <InputField
      value={value}
      type={'email'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSValue(e.target.value)}
      width={'medium'}
      height={'medium'}
      align={'center'}
      label={'Foo:'}
      labelPos={'top'}
      placeholder={'foo@foo.com'}
      required={true}
    />

    <br />

    <Button type="submit">Submit Foo</Button>
  </form>
);
```

```js
// TEXTAREA COMPONENT

return (
  <form>
    <InputField
      multi={true}
      rows={4}
      width={'large'}
      label={'Foo:'}
      labelPos={'Foo'}
      placeholder={'foo'}
      required={true}
    />

    <br />

    <Button type="submit">Submit Foo</Button>
  </form>
);
```

Note, you must include a `type="submit"` on your form control buttons for native html validation errors to appear.
