# react-native-flex-text-box

Extention of react native textbox,fully customizable,interactive,memory optimized textbox for form & nonform usage 

## Installation

```sh
npm install react-native-flex-text-box
```

## Usage

```js
import { FlexTextBox } from 'react-native-flex-text-box';

// ...

<FlexTextBox
        label={"User Name"}
        onChangeText={(x) => console.log(x)}
        placeholder={"enter username"}
        isControlled={true}
        prefixElement={prefixElement}
        suffixElement={suffixElement}
        clearable={true}
        passwordVisibilityToggle={true}
        focusAnimation={true}
        blurAnimation={true}
        customStyles={{
          input: { color: 'blue', paddingLeft: 25 },
          button: { backgroundColor: 'blue' },
          prefixContainer: { backgroundColor: 'red', padding: 2, borderRadius: 5 },
          suffixContainer: { backgroundColor: 'gray', padding: 2, borderRadius: 5 },
          label: { fontSize: 15, color: 'black' }
        }}
      />
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---