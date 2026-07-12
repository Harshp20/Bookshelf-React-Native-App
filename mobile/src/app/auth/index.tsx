import {
	Text,
	View,
	StyleSheet,
	TextInput,
	GestureResponderEvent,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import COLORS from "@/constants/colors";
import { Link } from "expo-router";
import SubmitButton from "@/components/SubmitButton";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {
		setIsLoading(!isLoading);
	};

	return (
		<KeyboardAvoidingView
			style={styles.screen}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={{ flex: 1 }}>
					<Image
						style={styles.image}
						source={require("../../../assets/images/i.png")}
						placeholder={{ blurhash }}
						contentFit="cover"
					/>
				</View>

				<View style={styles.formSection}>
					<View style={styles.form}>
						<View style={styles.formFields}>
							<View style={styles.textInputWithIcon}>
								<Ionicons
									name="mail-outline"
									size={25}
									color={COLORS.primary}
								/>
								<TextInput
									value={email}
									onChangeText={setEmail}
									placeholder="Email"
									style={styles.textInput}
									placeholderTextColor={COLORS.placeholderText}
									keyboardType="email-address"
									autoCapitalize="none"
								/>
							</View>

							<View style={styles.textInputWithIcon}>
								<Ionicons
									name="lock-closed-outline"
									size={25}
									color={COLORS.primary}
								/>
								<TextInput
									value={password}
									onChangeText={setPassword}
									placeholder="Password"
									style={styles.textInput}
									placeholderTextColor={COLORS.placeholderText}
									secureTextEntry={!showPassword}
								/>
								<TouchableOpacity
									onPress={() => setShowPassword(!showPassword)}
								>
									<Ionicons
										name={showPassword ? "eye-outline" : "eye-off-outline"}
										size={25}
										color={COLORS.primary}
									/>
								</TouchableOpacity>
							</View>

							<SubmitButton
								isLoading={isLoading}
								label="Submit Sign In form"
								title="Sign In"
								submitHandler={handleSubmit}
							/>
						</View>

						{/* Footer */}
						<View style={styles.footerText}>
							<Text>Don't have an account? </Text>
							<Link href={"/auth/signup"} style={styles.signUpText}>
								Sign Up
							</Link>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	scrollContent: {
		backgroundColor: COLORS.background,
		flex: 1,
	},
	image: {
		flex: 1,
	},
	formSection: {
		flex: 1,
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
	textInputWithIcon: {
		flexDirection: "row",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#bbb",
		width: "100%",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 2,
		justifyContent: "flex-start",
		backgroundColor: "#fff",
	},
	textInput: {
		flex: 1,
		padding: 14,
	},
	submitButton: {
		width: "100%",
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderRadius: 10,
	},
	submitButtonText: {
		textAlign: "center",
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
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

export default Login;
