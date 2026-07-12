import COLORS from "@/constants/colors";
import {
	ActivityIndicator,
	TouchableOpacity,
	Text,
	StyleSheet,
} from "react-native";

type SubmitButtonProps = {
	submitHandler: () => void;
	isLoading: boolean;
	label?: string;
	title?: string;
};

export default function SubmitButton({
	submitHandler,
	isLoading,
	label,
	title,
}: SubmitButtonProps) {
	return (
		<TouchableOpacity
			style={styles.submitButton}
			onPress={submitHandler}
			accessibilityLabel={label ?? "Submit login form"}
			activeOpacity={0.8}
		>
			{isLoading ? (
				<ActivityIndicator size={22} color={"#fff"} />
			) : (
				<Text style={styles.submitButtonText}>{title ?? "Submit"}</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
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
});
