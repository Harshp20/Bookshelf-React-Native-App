import SafeAreaScreen from "@/components/SafeAreaScreen";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	GestureResponderEvent,
	TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import COLORS from "@/constants/colors";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e: GestureResponderEvent) => {
		console.log(e);
	};

	return (
		<SafeAreaScreen>
			<View
				style={{
					flex: 1,
					backgroundImage: "",
				}}
			>
				{/* BG Image */}
				<Image
					style={styles.image}
					source={require("../../../assets/images/i.png")}
					placeholder={{ blurhash }}
					contentFit="contain"
					transition={500}
				/>

				{/* Login form */}
				<View style={{ padding: 40, flex: 1 }}>
					<View style={styles.form}>
						<View
							style={{
								flex: 1,
								justifyContent: "space-around",
								alignItems: "center",
								width: "100%",
							}}
						>
							{/* Email */}
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

							{/* Password */}
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
								{/* Password Show/Hide Icon */}
								<TouchableOpacity
									onPress={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<Ionicons
											name="eye-outline"
											size={25}
											color={COLORS.primary}
										/>
									) : (
										<Ionicons
											name="eye-off-outline"
											size={25}
											color={COLORS.primary}
										/>
									)}
								</TouchableOpacity>
							</View>

							{/* Submit */}
							<TouchableOpacity
								style={styles.submitButton}
								onPress={handleSubmit}
								accessibilityLabel="Submit login form"
								activeOpacity={0.8}
							>
								<Text style={styles.submitButtonText}>Submit</Text>
							</TouchableOpacity>
						</View>
						<Text style={styles.footerText}>2026 All Rights Reserved</Text>
					</View>
				</View>
			</View>
		</SafeAreaScreen>
	);
};

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const styles = StyleSheet.create({
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
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderRadius: 10,
	},
	submitButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
	footerText: { color: "#999", padding: 20 },
	form: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		borderRadius: 25, // Replace with a numeric value for RN
		padding: 40,
		// Dropshadow in React Native
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 8, // For Android shadow
		backgroundColor: "white",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		flex: 1,
		width: "100%",
		// backgroundColor: "#0553",
	},
});
export default Login;
