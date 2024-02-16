# Table

## Usage

To get started, declare an array of objects that define each column. The object must contain a `key` (used to associate table data with) and a `header` name for that column. Note, `header` can also contain JSX elements.

---

Please note, you must still handle responsive design yourself, for any jsx element that exceeds a cell width.

## Column Customization

Each column can be provided optional properties for more customization:

- `width`: defines a column width in px (provide only the number). This prop is only accepted for the default table layout (i.e. with no `scroll` prop).
  - Note, each column is divided evenly across the table. Any overflowing _string type_ data will be clipped with an ellipsis. The `width` property simply allows you to expand individual columns if you need more space, or you can use a newline `'\n'` to wrap overflowing strings. Alternatively, you can also provide the `wrapContent` boolean property to the `Table` component to wrap overflowing data _for all table cells_.
- `hideHeader`: hides the header name from a column. If all the columns have a `hideHeader: true` property, then the table's gray header area is hidden.
- `hideColumn`: hides the entire column.
- `align`: aligns whole column via `'right' | 'left' | 'center'`.
- `bold`: applies bold header.

```js
// Column type imported from Table.tsx
const columns: Column[] = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'username',
    header: 'Username',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'phone',
    header: 'Phone',
  },
  {
    key: 'component',
    header: 'Component',
    hideHeader: true,
    align: 'right',
  },
];
```

---

## Props

Next, provide props for the `Table` component. A `columns` prop (pass the above columns array here) and `data` prop are required. The `data` prop is also an array of objects, each object representing a row of data. The properties correspond with a `key` from a columns object.

The `Table` component takes optional props:

- `scroll`: for horizontal scrolling. Must pass a column width in px (provide only the number), which will be applied evenly across the table. You can still use a newline `'\n'` to wrap overflowing strings. Also, in scroll mode, responsive design will not be applied (i.e. shrinking or expanding the table container will not affect column widths).
- `label`: provides a title for the table container.
- `divider`: dividers per row.
- `wrapContent`: wrap overflowing data for all table cells.

  - Tip: please note, unfortunately, this property will only wrap overflowing whitespace. For overflowing contiguous characters, you must manually wrap using newline characters or inline CSS. E.g.

    ```js
    <Table
      columns={columns}
      data={[{email: <span style={{wordBreak: 'break-word'}}>{email}</span>}]}
      wrapContent={true}
    />
    ```

- `verticalView`: manually activate vertical table view without waiting for media queries.

  - Tip: use JS to manipulate the vertical view state. E.g. using the `'resize'` event listener, check the size of current window (`window.innerWidth`) and adjust the vertical view state accordingly.

    ```js
    const [verticalView, setVerticalView] = useState(false);

    window.addEventListener('resize', () => {
      if (window.innerWidth < 1600) {
        setVerticalView(true);
      } else {
        setVerticalView(false);
      }
    });

    <Table columns={columns} data={data} verticalView={verticalView} />;
    ```

```js
<Table
  columns={columns}
  data={[
    {
      name: 'John Doe',
      username: 't1cguser',
      email: 'john@t1cg.com',
      phone: '111-111-1111',
      component: <button>Fire</button>,
    },
    {
      name: 'Jane Doe',
      username: 't1cguser',
      email: 'jane@t1cg.com',
      phone: '222-222-2222',
      component: <button>Fire</button>,
    },
    {
      name: 'Doe John',
      username: 't1cgadmin',
      email: 'dj1@t1cg.com',
      phone: '333-333-3333',
      component: <button>Promotion</button>,
    },
    {
      name: 'Doe Jane',
      username: 't1cgadmin',
      email: 'dj2@t1cg.com',
      phone: '444-444-4444',
      component: <button>Promotion</button>,
    },
  ]}
  // scroll={200}
  // wrapContent={true}
  // verticalView={true}
  label={'Employees'}
  divider={true}
/>
```

Note, you can provide JSX expressions and components inside a data property like so:

```js
<Table
  columns={columns}
  data={[
    {
      math: (
        <span>
          <button onClick={() => doMath(1)}>Click for sum</button>
          <p>1 + 1 = {sum}</p>
        </span>
      ),
      name: (
        <span style={{fontWeight: 'bold'}}>
          <em>John Doe</em>
        </span>
      ),
    },
  ]}
/>
```
