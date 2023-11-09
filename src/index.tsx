import React, {
  useState,
  useRef,
  useEffect
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Clipboard,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import type {
  ViewStyle,
  StyleProp,
  TextStyle
} from 'react-native';
import {
  styles
} from '../assets/styles/style';

/**
 * 
 */
interface FlexTextBoxProps {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isControlled?: boolean;
  passwordVisibilityToggle?: boolean;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
  clearable?: boolean;
  copyToClipboard?: boolean;
  focusAnimation?: boolean;
  blurAnimation?: boolean;
  suggestions?: string[];
  autocomplete?: boolean;
  validationRegex?: RegExp; 
  errorMessage?: string; 
  customStyles?: {
    container?: StyleProp<ViewStyle>;
    prefixContainer?: StyleProp<ViewStyle>;
    suffixContainer?: StyleProp<ViewStyle>;
    input?: StyleProp<TextStyle>;
    button?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    error?:StyleProp<TextStyle>;
  };
}

/**
 * 
 * @param param0 
 * @returns 
 */
export const FlexTextBox: React.FC<FlexTextBoxProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  // error,
  isControlled,
  passwordVisibilityToggle,
  prefixElement,
  suffixElement,
  clearable,
  copyToClipboard,
  focusAnimation,
  blurAnimation,
  suggestions,
  autocomplete,
  validationRegex,
  errorMessage,
  customStyles,
}) => {

  /**
   * 
   */
  const inputRef = useRef<TextInput>(null);
  const translateY = new Animated.Value(0);
  const [isFocused, setIsFocused] = useState(false);
  const windowDimensions = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ window: windowDimensions, screen: screenDimensions });

  const inputStyle = StyleSheet.flatten([styles.input, customStyles?.input]);
  const labelStyle = StyleSheet.flatten([styles.label, customStyles?.label]);
  const containerStyle = StyleSheet.flatten([styles.container, customStyles?.container]);
  const prefixStyle = StyleSheet.flatten([styles.prefixContainer, customStyles?.prefixContainer]);
  const suffixStyle = StyleSheet.flatten([styles.suffixContainer, customStyles?.suffixContainer]);
  const errorStyle = StyleSheet.flatten([styles.errorMessageStyle, customStyles?.error]);

  /**
   * 
   */
  useEffect(() => {
    if (autocomplete) {
      const filtered = suggestions?.filter((suggestion) => suggestion.toLowerCase().includes((value ?? '').toLowerCase()))?.slice(0, 5) ?? [];
      setFilteredSuggestions(filtered);
    }
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  }, [value, suggestions, autocomplete]);

  const validateInput = (text: string) => {
    if (validationRegex && !validationRegex.test(text)) {
      setError(errorMessage || 'Invalid input'); // Set custom error message or use a default one
    } else {
      setError(null);
    }
  };

  /**
   * 
   */
  const handleFocus = () => {
    setIsFocused(true);
    if (focusAnimation || isFocused) {
      Animated.timing(translateY, {
        toValue: -20,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  /**
   * 
   */
  const handleBlur = () => {
    setIsFocused(false);
    if (blurAnimation || isFocused) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  /**
   * 
   * @param text 
   */
  const handleChangeText = (text: string) => {
    if (isControlled) {
      validateInput(text);
      onChangeText(text);
    }
  };

  /**
   * 
   */
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  /**
   * 
   */
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
    onChangeText('');
  };

  /**
   * 
   */
  const copyToClipboardHandler = () => {
    if (value) {
      Clipboard.setString(value);
      // Optionally provide user feedback (e.g., show a message)
      console.log('Copied to clipboard!');
    }
  };

  /**
   * 
   * @param suggestion 
   */
  const selectSuggestion = (suggestion: string) => {
    onChangeText(suggestion);
    setFilteredSuggestions([]);
  };

  /**
   * 
   * @param param0 
   * @returns 
   */
  const renderSuggestionItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => selectSuggestion(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={containerStyle} >
      <Animated.Text style={[labelStyle, { transform: [{ translateY }] }]}>{label}</Animated.Text>
      <View style={[styles.inputContainer, { position: 'relative' }]}>
        {prefixElement && <View style={[prefixStyle, { position: 'absolute', left: 0 }]}>{prefixElement}</View>}
        <TextInput
          value={value}
          onChangeText={(text) => handleChangeText(text)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          secureTextEntry={passwordVisibilityToggle && !isPasswordVisible}
          style={[inputStyle, { width: dimensions.screen.width - 20 }]}
          ref={inputRef}
        />
        {suffixElement && <View style={[suffixStyle, { position: 'absolute', right: 0 }]}>{suffixElement}</View>}
        {passwordVisibilityToggle && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: 'absolute', right: 0, top: '50%', transform: [{ translateY: -50 }] }}
          >
            <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
        {clearable && value && (
          <TouchableOpacity
            onPress={clearInput}
            style={{ position: 'absolute', right: passwordVisibilityToggle ? 24 : 0, top: '50%', transform: [{ translateY: -50 }] }}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
        )}
        {copyToClipboard && (
          <TouchableOpacity
            onPress={copyToClipboardHandler}
            style={{
              position: 'absolute',
              right: clearable ? 48 : passwordVisibilityToggle ? 24 : 0,
              top: '50%',
              transform: [{ translateY: -50 }],
            }}
          >
            <Text>Copy</Text>
          </TouchableOpacity>
        )}
        {autocomplete && (
          <FlatList
            data={filteredSuggestions}
            renderItem={renderSuggestionItem}
            keyExtractor={(item) => item.toString()}
            style={{
              position: 'absolute',
              top: 50,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderColor: 'gray',
              borderWidth: 1,
              maxHeight: 150,
              zIndex: 1,
            }}
          />
        )}
      </View>
      <View style={errorStyle}>
        {error && <Text style={errorStyle}>{error}</Text>}
      </View>
    </View>
  );
};


