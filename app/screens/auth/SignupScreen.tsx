import React from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Button, Screen, Spacer, Text, TextField } from '../../components';
import { Icon } from '../../components/Icon';
import { AppNavigatorProps } from '../../navigators/AppNavigator.tsx';
import { AppDispatch } from '../../store';
import { saveSignupUserDetails } from '../../store/auth/authSlice.ts';
import {
  $authContentContainerWrapper,
  $authContentWrapper,
  $authFlex,
  $authSubHeadingText,
  $centerTextStyle,
  $flexOne,
  $imageBackground,
  spacing,
} from '../../theme';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number can only contain numbers')
    .matches(
      /^(?:234|0)?[789]\d{9}$/,
      'Phone number must be a valid Nigeria phone number',
    ),
  email: Yup.string().email('Invalid email').required('Required'),
});

export const SignupScreen = () => {
  const appNavigation = useNavigation<AppNavigatorProps>();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-header"
      source={require('../../../assets/images/logo_background.png')}
      style={$imageBackground}>
      <Screen
        preset="auto"
        backgroundColor="transparent"
        contentContainerStyle={$flexOne}
        safeAreaEdges={['top', 'bottom']}>
        <View style={[$flexOne, $authContentContainerWrapper]}>
          <View style={[$authContentWrapper, $authFlex]}>
            <Icon icon={'logo'} />
            <Spacer height={40} />
            <Text
              testID="signup-heading"
              preset="heading"
              style={[$centerTextStyle]}>
              Register
            </Text>
            <Spacer height={22} />
            <Text
              preset="subheading"
              testID="signup-subtext"
              style={[$centerTextStyle, $authSubHeadingText]}>
              To register on Lendsqr, please enter your details below
            </Text>
          </View>

          <View>
            <Formik
              initialValues={{
                fullName: '',
                phoneNumber: '',
                email: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                const formattedNumber = values.phoneNumber.startsWith('234')
                  ? `+${values.phoneNumber}`
                  : `+234${
                      values.phoneNumber.startsWith('0')
                        ? values.phoneNumber.slice(1)
                        : values.phoneNumber
                    }`;
                dispatch(
                  saveSignupUserDetails({
                    ...values,
                    phoneNumber: formattedNumber,
                  }),
                );
                appNavigation.navigate('SignupWithGoogle');
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <View style={$formContainer}>
                    <TextField
                      label="Full Name"
                      placeholder="Bakare Oyindamola"
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                      status={
                        errors.fullName && touched.fullName
                          ? 'error'
                          : undefined
                      }
                      helper={
                        errors.fullName && touched.fullName
                          ? errors.fullName
                          : ''
                      }
                    />
                    <TextField
                      label="Phone Number"
                      placeholder="07040456921"
                      keyboardType="phone-pad"
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      status={
                        errors.phoneNumber && touched.phoneNumber
                          ? 'error'
                          : undefined
                      }
                      helper={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : ''
                      }
                    />
                    <TextField
                      label="Email Address"
                      placeholder="theonlybakare@gmail.com"
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      status={
                        errors.email && touched.email ? 'error' : undefined
                      }
                      helper={errors.email && touched.email ? errors.email : ''}
                    />
                  </View>
                  <Spacer height={40} />
                  <Button
                    testID="signup-button"
                    preset="filled"
                    onPress={() => {
                      handleSubmit();
                    }}>
                    Continue
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Screen>
    </ImageBackground>
  );
};

const $formContainer: ViewStyle = {
  gap: spacing.s16,
};
