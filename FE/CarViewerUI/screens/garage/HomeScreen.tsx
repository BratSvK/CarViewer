import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AbstractText from "../../components/AbstractText";
import { EmptyContainer } from "../../components/EmptyContainer";
import CreateGarageDialog from "../../components/home/garage/CrateGarageModal";
import SwipeableGarageCard from "../../components/home/garage/SwipeableGarageCard";
import HomeHeader from "../../components/home/HomeHeader";
import LOCALIZATION from "../../constants/localization";
import { SCREENS } from "../../constants/screens";
import { GlobalStyles } from "../../constants/styles";
import { addGarage, removeGarage, selectGarages } from "../../store/home/garage";
import { Garage } from "../../types/home/garage/garage";
import { showToast } from "../../util/toast";


const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const garages = useSelector(selectGarages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  // useEffect(() => {
  //   dispatch(loadGaragesAsync());
  // }, [dispatch]);

  const handleGarageCreated = (newGarage: Garage) => {
    dispatch(addGarage(newGarage));
    showToast("success", LOCALIZATION.homeScreen.garageCreatedSuccess, { name: newGarage.name });
  };

  const handleRemoveGarage = (garageId: string) => {
    dispatch(removeGarage(garageId));
    showToast("info", LOCALIZATION.homeScreen.garageRemovedSuccess);
  };

  const handleNavigateToCars = () => {
    navigation.navigate(SCREENS.CAR as never);
  };
  
  const ownedGarages: Garage[] = garages.filter((g: Garage) => !g.isShared);
  const hasGarages: boolean = ownedGarages.length > 0;

  return (
    <View style={styles.container}>
      <HomeHeader title={LOCALIZATION.homeScreen.homeTitle} />
      {hasGarages && (
          <View style={styles.sectionHeader}>
            <AbstractText
              textKey={LOCALIZATION.homeScreen.garageCreateLabel}
              style={styles.sectionTitle}
            />
            <TouchableOpacity
              onPress={() => setIsDialogOpen(true)}
              style={styles.iconButton}
            >
              <FontAwesome6
                name="plus"
                iconStyle="solid"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!hasGarages ? (
          <EmptyContainer
            iconName="warehouse"
            title={t(LOCALIZATION.homeScreen.garageEmptyList)}
            description={t(LOCALIZATION.homeScreen.garageEmptyListDesc)}
            buttonLabel={t(LOCALIZATION.homeScreen.garageEmptyListBtnLabel)}
            onButtonPress={() => setIsDialogOpen(true)}
          />
        ) : (
          ownedGarages.map((garage) => (
            <SwipeableGarageCard
              key={garage.id}
              garage={garage}
              onPress={handleNavigateToCars}
              onRemove={handleRemoveGarage}
            />
          ))
        )}
      </ScrollView>

      <CreateGarageDialog
        visible={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onGarageCreated={handleGarageCreated}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  header: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary400,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: GlobalStyles.colors.primary50,
  },
  scrollContent: { padding: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: GlobalStyles.colors.primary50,
  },
  iconButton: {
    backgroundColor: GlobalStyles.colors.iconActive,
    padding: 12,
    borderRadius: GlobalStyles.radius,
  },
  requestButton: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary400,
    borderRadius: GlobalStyles.radius,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 16,
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: GlobalStyles.colors.primary50,
  },
  content: {
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
  }
});
