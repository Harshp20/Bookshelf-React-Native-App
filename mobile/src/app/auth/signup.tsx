import SubmitButton from "@/components/SubmitButton";
import TextInputWithIcon from "@/components/TextInputWithIcon";
import COLORS from "@/constants/colors";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		setIsLoading(!isLoading);
	};

	return (
		<KeyboardAvoidingView
			style={styles.fullSize}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView
				contentContainerStyle={styles.fullSize}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				{/* Form */}
				<View style={styles.formSection}>
					<View style={styles.form}>
						<View style={styles.formFields}>
							{/* Header */}
							<Text
								style={{
									fontWeight: "bold",
									color: COLORS.primary,
									fontSize: 32,
									textAlign: "center",
								}}
							>
								BookShelf 📙
							</Text>

							{/* Inputs */}
							<TextInputWithIcon
								iconName="person-outline"
								iconSize={25}
								iconColor={COLORS.primary}
								value={username}
								onChangeText={setUsername}
								placeholder="Username"
								keyboardType="email-address"
								autoCapitalize="none"
							/>

							<TextInputWithIcon
								iconName="mail-outline"
								iconSize={25}
								iconColor={COLORS.primary}
								value={email}
								onChangeText={setEmail}
								placeholder="Email"
								keyboardType="email-address"
								autoCapitalize="none"
							/>

							<TextInputWithIcon
								iconName="lock-closed-outline"
								iconSize={25}
								iconColor={COLORS.primary}
								value={password}
								onChangeText={setPassword}
								placeholder="Password"
								placeholderTextColor={COLORS.placeholderText}
								secureTextEntry={!showPassword}
								component={
									<TouchableOpacity
										onPress={() => setShowPassword(!showPassword)}
									>
										<Ionicons
											name={showPassword ? "eye-outline" : "eye-off-outline"}
											size={25}
											color={COLORS.primary}
										/>
									</TouchableOpacity>
								}
							/>

							<SubmitButton
								isLoading={isLoading}
								label="Submit Sign Up form"
								title="Sign Up"
								submitHandler={handleSubmit}
							/>
						</View>

						{/* Footer */}
						<View style={styles.footerText}>
							<Text>Already have an account? </Text>
							<Link href={"/auth"} style={styles.signUpText}>
								Sign In
							</Link>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	fullSize: {
		flex: 1,
	},
	screen: {
		flex: 1,
	},
	scrollContent: {
		flex: 1,
	},
	image: {
		flex: 1,
	},
	formSection: {
		backgroundColor: COLORS.background,
		flex: 1,
		justifyContent: "center",
		padding: 40,
	},
	form: {
		alignItems: "center",
		borderRadius: 25,
		padding: 40,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 8,
		backgroundColor: "white",
	},
	formFields: {
		width: "100%",
		gap: 24,
	},
	footerText: {
		flexDirection: "row",
		color: "#999",
		paddingTop: 20,
	},
	signUpText: {
		color: COLORS.primary,
	},
});
export default Signup;
