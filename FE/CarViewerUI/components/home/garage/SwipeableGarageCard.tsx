import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import GarageCard from "./GarageCard";

interface SwipeableGarageCardProps {
  garage: any;
  onPress: () => void;
  onRemove: (id: string) => void;
}

const SWIPE_THRESHOLD = -100;

const RightAction: React.FC<{ drag: SharedValue<number> }> = ({ drag }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value + 30 }],
  }));

  return (
    <Animated.View style={[styles.rightAction, animatedStyle]}>
      <FontAwesome6 name="trash" iconStyle="solid" size={24} color="white" />
    </Animated.View>
  );
};

const SwipeableGarageCard: React.FC<SwipeableGarageCardProps> = ({
  garage,
  onPress,
  onRemove,
}) => {
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.max(-120, event.translationX);
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-500, { duration: 200 });
        runOnJS(onRemove)(garage.id);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyle]}>
          <GarageCard garage={garage} onPress={onPress} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SwipeableGarageCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  rightAction: {
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});
