import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlexTextBox } from 'react-native-flex-text-box';


interface UserFormData {
  username: string;
  password: string;
}

const createUserForm = (): {
  setUsername: (newUsername: string) => void;
  setPassword: (newPassword: string) => void;
  getFormData: () => UserFormData;
} => {
  let username: string = '';
  let password: string = '';

  const setUsername = (newUsername: string): void => {
    username = newUsername;
  };

  const setPassword = (newPassword: string): void => {
    password = newPassword;
  };

  const getFormData = (): UserFormData => {
    return {
      username,
      password,
    };
  };

  return {
    setUsername,
    setPassword,
    getFormData,
  };
};

export default function App() {

  const prefixElement = <Text style={{ color: 'white' }}>Mr.</Text>;
  const suffixElement = <Text style={{ color: 'white' }}>Valid</Text>;

  const userForm = createUserForm();

  return (
    <View style={styles.container}>
      <FlexTextBox
        label={"user name"}
        onChangeText={(x) => { console.log(x); userForm.setUsername(x); }}
        placeholder={"enter username"}
        isControlled={true}
        prefixElement={prefixElement}
        suffixElement={suffixElement}
        clearable={true}
        passwordVisibilityToggle={false}
        focusAnimation={true}
        blurAnimation={true}
        validationRegex={/^[a-zA-Z0-9]+$/}
        errorMessage="Invalid characters. Use only letters and numbers."
        // copyToClipboard={true}
        // suggestions={['manoj','kumar']}
        // autocomplete={true}
        customStyles={{
          input: { color: 'blue', paddingLeft: 25 },
          button: { backgroundColor: 'blue' },
          prefixContainer: { backgroundColor: 'red', padding: 2, borderRadius: 5 },
          suffixContainer: { backgroundColor: 'gray', padding: 2, borderRadius: 5 },
          label: { fontSize: 16, color: 'blue' },
          error: { color: 'red', fontFamily: 'Roboto', fontSize: 11 },
          container: { margin: 0 }
        }}
      />

      <FlexTextBox
        label={"Password"}
        onChangeText={(x) => { console.log(x); userForm.setPassword(x); }}
        placeholder={"enter password"}
        isControlled={true}
        prefixElement={prefixElement}
        suffixElement={suffixElement}
        clearable={true}
        passwordVisibilityToggle={true}
        focusAnimation={true}
        blurAnimation={true}
        validationRegex={/^[a-zA-Z0-9]+$/}
        errorMessage="Invalid characters. Use only letters and numbers."
        customStyles={{
          input: { color: 'blue', paddingLeft: 25 },
          button: { backgroundColor: 'blue' },
          prefixContainer: { backgroundColor: 'red', padding: 2, borderRadius: 5 },
          suffixContainer: { backgroundColor: 'gray', padding: 2, borderRadius: 5 },
          label: { fontSize: 16, color: 'blue' },
          error: { color: 'red', fontFamily: 'Roboto', fontSize: 11 },
          container: { margin: 0 }
        }}
      />
      <TouchableOpacity onPress={(() => { console.log('submitted'); console.log(userForm.getFormData()) })}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>submit</Text>
        </View>
      </TouchableOpacity>
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
  buttonContainer: {
    backgroundColor: '#2196F3', // Material Design primary color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center'
  },
});
