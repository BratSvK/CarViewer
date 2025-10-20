import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CreateGarageDialog from "../components/home/garage/CrateGarageModal";
import GarageCard from "../components/home/garage/GarageCard";
import LogoutButton from "../components/LogoutButton";
import { SCREENS } from "../constants/screens";
import { GlobalStyles } from "../constants/styles";
import { addGarage, selectGarages } from "../store/home/garage";
import { Garage } from "../types/home/garage/garage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const garages = useSelector(selectGarages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(loadGaragesAsync());
  // }, [dispatch]);

  const handleGarageCreated = (newGarage: Garage) => {
    dispatch(addGarage(newGarage));
    Alert.alert("Garáž vytvorená", `${newGarage.name} bola úspešne pridaná`);
  };

  const handleRequestGarage = () => {
    Alert.alert("Request Garage", "Táto funkcia bude implementovaná neskôr");
  };

  const handleNavigateToCars = (garageId: string) => {
    navigation.navigate(SCREENS.CAR as never);
  };

  const ownedGarages: Garage[] = garages.filter((g: Garage) => !g.isShared);
  const sharedGarages: Garage[] = garages.filter((g: Garage) => g.isShared);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Garages</Text>
        <LogoutButton />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Garages</Text>
          <TouchableOpacity
            onPress={() => setIsDialogOpen(true)}
            style={styles.iconButton}
          >
            <FontAwesome6 name="plus" iconStyle="solid" size={20} color="white" />
          </TouchableOpacity>
        </View>
        {ownedGarages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No garages yet. Create your first one!
            </Text>
          </View>
        ) : (
          ownedGarages.map((garage) => (
            <GarageCard
              key={garage.id}
              garage={garage}
              onPress={() => handleNavigateToCars(garage.id)}
            />
          ))
        )}

        {/* {sharedGarages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Shared Garages</Text>
            {sharedGarages.map((garage) => (
              <GarageCard
                key={garage.id}
                garage={garage}
                onPress={() => handleNavigateToCars(garage.id)}
              />
            ))}
          </>
        )} */}

        {/* <TouchableOpacity
          style={styles.requestButton}
          onPress={handleRequestGarage}
        >
          <Text style={styles.requestButtonText}>Request Other Garage</Text>
        </TouchableOpacity> */}
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
    paddingTop: 50,
    paddingBottom: 80,
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
    fontWeight: "700",
    color: GlobalStyles.colors.primary50,
  },
  scrollContent: { padding: 16 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: GlobalStyles.colors.primary50,
  },
  iconButton: {
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 12,
    borderRadius: GlobalStyles.radius,
  },
  emptyContainer: { alignItems: "center", paddingVertical: 40 },
  emptyText: { color: GlobalStyles.colors.primary100, fontSize: 16 },
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
});
