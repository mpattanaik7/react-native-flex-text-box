import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { FlexTextBox } from 'react-native-flex-text-box';

export default function App() {
  const prefixElement = <Text style={{ color: 'white' }}>Mr.</Text>;
  const suffixElement = <Text style={{ color: 'white' }}>Valid</Text>;

  return (
    <View style={styles.container}>
      <FlexTextBox
        label={"user name"}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
