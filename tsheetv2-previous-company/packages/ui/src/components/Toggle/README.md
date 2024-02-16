# Toggle

## Usage

---

After importing the toggle, there are two mandatory props you will need to setup: isToggled and onToggle with color being optional.

- **isToggled**: true | false.
- **onToggle**: a function that will change the isToggled to the opposite boolean.
- **color**: blue | orange - default is orange.

## Example

---

```js
const ToggleExample = () => {
  const [isTest, setIsTest] = useState(false);

  return (
    <>
      <Toggle isToggled={isTest} onToggle={() => setIsTest(!isTest)} color="blue" />
    </>
  );
};
```
