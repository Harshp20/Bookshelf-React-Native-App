import COLORS from "@/constants/colors";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeAreaScreen = ({ children }: { children: React.ReactNode }) => {
	const insets = useSafeAreaInsets();

	return (
		// NOTE: Apply insets here
		<View style={[styles.container, { paddingTop: insets.top }]}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
});

export default SafeAreaScreen;
