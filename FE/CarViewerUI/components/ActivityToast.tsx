import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  onClose: (id: string) => void;
}

export const ActivityToast = ({ id, title, description, variant = 'default', onClose }: ToastProps) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose(id));
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        variant === 'destructive' ? styles.destructive : styles.default,
        { opacity }
      ]}
    >
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Pressable onPress={handleClose} style={styles.closeButton}>
        <FontAwesome6 name="circle" iconStyle="solid" size={16} color="#999999" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingRight: 20,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  default: {
    backgroundColor: '#1e1e22',
    borderWidth: 1,
    borderColor: '#2f2f36',
  },
  destructive: {
    backgroundColor: '#e63946',
    borderWidth: 1,
    borderColor: '#e63946',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f2f2f2',
  },
  description: {
    fontSize: 14,
    color: '#f2f2f2',
    opacity: 0.9,
  },
  closeButton: {
    padding: 4,
    marginLeft: 16,
  },
});
