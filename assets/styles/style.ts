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
});