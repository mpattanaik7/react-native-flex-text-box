// assets/styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#2196F3',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#2196F3',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: '#333',
    },
    label: {
        color: '#2196F3',
        fontSize: 12,
        marginBottom: 5,
    },
    prefixContainer: {
        marginRight: 10,
    },
    suffixContainer: {
        marginRight: 10,
    },
    errorMessageStyle: {
        color: 'red',
        marginTop: 0,
        minHeight: 20
    }, // Add a fixed height for error message container
    buttonContainer: {
        backgroundColor: '#2196F3', // Material Design primary color
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },

});