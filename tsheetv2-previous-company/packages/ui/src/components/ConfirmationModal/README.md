# Confirmation Modal

A pre-styled modal for confirmations.

## Props

- `title?`: optional title for the modal. Default is `'Confirmation'`.
- `handleModalConfirm`: a callback for handling confirmation.
- `close`: a callback to set the modal activation state. When set, you can either click the `'x'` in the upper right corner of the modal, press the `esc` key, click the `Confirm` or `Cancel` buttons, or click outside the modal to close it.
- `action`: a string describing an action input for the following template:
  - `'Are you sure you want to {action}?'`

---

## Example

```js
const ConfirmationModalExample = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalConfirm = () => {
    console.log('hello world');
  };

  return (
    <>
      <Button onClick={() => setShowModal(!showModal)}>Trigger Modal</Button>

      {showModal && (
        <ConfirmationModal
          handleModalConfirm={handleModalConfirm}
          close={() => setShowModal(!showModal)}
          action={'activate foo'}
        />
      )}
    </>
  );
};
```
