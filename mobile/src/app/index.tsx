import COLORS from "@/constants/colors";
import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text>Edit src/app/index.tsx to edit this screen.</Text>

			<Link href="/auth" asChild>
				<TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
					<Text style={{ color: "#fff", fontWeight: "bold" }}>Sign In</Text>
				</TouchableOpacity>
			</Link>
			<Link href="/auth/signup" asChild>
				<TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
					<Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	submitButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderRadius: 10,
	},
});
