import COLORS from "@/constants/colors";
import Ionicons, {
	IoniconsIconName,
} from "@react-native-vector-icons/ionicons";
import { View, StyleSheet, TextInput, TextInputProps } from "react-native";

type TextInputWithIconProps = TextInputProps & {
	iconName: IoniconsIconName;
	iconSize: number;
	iconColor: string;
} & { component?: React.ReactNode };

const TextInputWithIcon = ({
	iconColor,
	iconName,
	iconSize = 25,
	component,
	placeholderTextColor = COLORS.placeholderText,
	...textInputProps
}: TextInputWithIconProps) => {
	return (
		<View style={styles.textInputWithIcon}>
			<Ionicons
				name={iconName}
				size={iconSize}
				color={COLORS.primary || iconColor}
			/>
			<TextInput
				style={styles.textInput}
				placeholderTextColor={placeholderTextColor}
				{...textInputProps}
			/>
			{component}
		</View>
	);
};

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
});

export default TextInputWithIcon;
