import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Button = (props: any) => {
  const customBGColor = '#3B82F6';

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={props?.disabled}
        //@ts-ignore
        block
        style={[
          styles.btnStyle,
          {backgroundColor: props?.bgColor || customBGColor},
        ]}
        onPress={() => props?.onPress && props?.onPress()}>
        <View style={[styles.btnContentWrapperView, {width: props?.width}]}>
          {/* Button Text */}
          <Text style={styles.btnText}>{props?.text || ''}</Text>

          {/* Loading */}
          {props?.isLoading && (
            <ActivityIndicator
              size={22}
              color={Colors.white}
              style={styles.loadingStyle}
            />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    flex: 1,
    color: 'blue',
    fontSize: 18,
    letterSpacing: 1,
    textAlign: 'center',
  },
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Last Added Css
  btnContentWrapperView: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: 'blue',
  },
  loadingStyle: {
    transform: [{scaleX: 0.6}, {scaleY: 0.6}],
  },
});
