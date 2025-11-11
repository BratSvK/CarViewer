import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { GlobalStyles } from "../../../constants/styles";
import GarageCard from "./GarageCard";

interface SwipeableGarageCardProps {
  garage: any;
  onPress: () => void;
  onRemove: (id: string) => void;
}

const SWIPE_THRESHOLD = -80;
const ACTION_WIDTH = 90;

const SwipeableGarageCard: React.FC<SwipeableGarageCardProps> = ({
  garage,
  onPress,
  onRemove,
}) => {
  const translateX = useSharedValue(0);

  // Pan gesture na potiahnutie karty
  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.min(0, Math.max(-ACTION_WIDTH, event.translationX));
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-500, { duration: 300 });
        runOnJS(onRemove)(garage.id);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));


  const rightActionAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-ACTION_WIDTH, 0],
      [1, 0],
      Extrapolation.CLAMP 
    );

    return { opacity };
  });

const RightAction = () => {
  return (
    <Animated.View style={[styles.rightAction, rightActionAnimatedStyle]}>
      <FontAwesome6 name="trash" iconStyle="solid" size={24} color="white" />
    </Animated.View>
  );
};

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {/* Akcia na pozadí (kôš) */}
        <RightAction />

        {/* Potiahnuteľná karta v popredí */}
        <GestureDetector gesture={pan}>
          <Animated.View style={animatedStyle}>
            <GarageCard garage={garage} onPress={onPress} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default SwipeableGarageCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
    borderRadius: GlobalStyles.radius,
    overflow: "hidden",
  },
  rightAction: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.danger500,
  },
});
