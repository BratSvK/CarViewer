import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import LOCALIZATION from '../constants/localization';
import { logout } from '../store/auth';

const LogoutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      t(LOCALIZATION.homeScreen.logoutAlert),
      t(LOCALIZATION.homeScreen.logoutInnerAlert),
      [
        { text: t(LOCALIZATION.homeScreen.logoutCancel), style: "cancel" },
        {
          text: t(LOCALIZATION.homeScreen.logoutConfirm),
          onPress: () => dispatch(logout()),
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <FontAwesome6
      name="power-off"
      iconStyle="solid"
      color="#D32F2F"
      style={styles.icon}
      onPress={handleLogout}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 10,
    fontSize: 30,
  },
});

export default LogoutButton;