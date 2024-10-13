import { Platform, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { icons } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker'; // Import Picker

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPicker, setShowPicker] = useState(false); // Single state to manage picker visibility
    const [date, setDate] = useState(new Date()); // Initialize with current date
    const [isTimePicker, setIsTimePicker] = useState(false); // State to differentiate between date and time picker
    const [selectedSeverity, setSelectedSeverity] = useState(value || ""); // Initialize with value prop

    useEffect(() => {
        // Sync with the value prop in case it's updated externally
        if (title === "Severity" && value) {
            setSelectedSeverity(value);
        }
    }, [value]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);

        // Format the date/time based on the mode
        if (isTimePicker) {
            handleChangeText(currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // Format time
        } else {
            handleChangeText(currentDate.toLocaleDateString()); // Format date
        }
    };

    const openDatePicker = () => {
        setIsTimePicker(false); // Set to date picker
        setShowPicker(true); // Show the picker
    };

    const openTimePicker = () => {
        setIsTimePicker(true); // Set to time picker
        setShowPicker(true); // Show the picker
    };

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-black font-pmedium">{title}</Text>

            {title === "Severity" ? (
                <View className="w-full h-16 px-4 bg-slate-100 rounded-xl border-2 border-slate-200 focus:border-primary">
                    <Picker
                        selectedValue={selectedSeverity}
                        onValueChange={(itemValue) => {
                            setSelectedSeverity(itemValue); // Update internal state
                            handleChangeText(itemValue); // Pass updated value to parent
                        }}
                        style={{ flex: 2, color: "black" }}
                    >
                        <Picker.Item label="Select Severity" value="" />
                        <Picker.Item label="Mild" value="Mild" />
                        <Picker.Item label="Moderate" value="Moderate" />
                        <Picker.Item label="Severe" value="Severe" />
                    </Picker>
                </View>

                    ):title === "week" ? (
                <View className="w-full h-16 px-4 bg-slate-100 rounded-xl border-2 border-slate-200 focus:border-primary">
                    <Picker
                        selectedValue={selectedSeverity}
                        onValueChange={(itemValue) => {
                            setSelectedSeverity(itemValue); // Update internal state
                            handleChangeText(itemValue); // Pass updated value to parent
                        }}
                        style={{ flex: 2, color: "black" }}
                    >
                        <Picker.Item label="Select Day" value="" />
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                </View>



            ) : title === "Note" ? (
                // Note field (multi-line TextInput)
                <View className="w-full px-4 bg-slate-100 rounded-xl border-2 border-slate-200 focus:border-primary h-">
                    <TextInput
                        className="text-black font-psemibold text-base mt-3"
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7B7B8B"
                        onChangeText={handleChangeText}
                        multiline={true} // Enable multi-line for note
                        numberOfLines={4} // Specify how many lines to show by default
                        textAlignVertical="top" // Align text to the top
                        {...props}
                    />
                </View>

            ) : title === "Description" ? (
                // Note field (multi-line TextInput)
                <View className="w-full px-4 bg-slate-100 rounded-xl border-2 border-slate-200 focus:border-primary h-[%]">
                    <TextInput
                        className="text-black font-psemibold text-base mt-3"
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7B7B8B"
                        onChangeText={handleChangeText}
                        multiline={true} // Enable multi-line for note
                        numberOfLines={4} // Specify how many lines to show by default
                        textAlignVertical="top" // Align text to the top
                        {...props}
                    />
                </View>


            ): title === "Title" ? (
                // Note field (multi-line TextInput)
                <View className="w-full px-4 bg-slate-100 rounded-xl border-2 border-slate-200 focus:border-primary h-[%]">
                    <TextInput
                        className="text-black font-psemibold text-base mt-3"
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7B7B8B"
                        onChangeText={handleChangeText}
                        multiline={true} // Enable multi-line for note
                        numberOfLines={4} // Specify how many lines to show by default
                        textAlignVertical="top" // Align text to the top
                        {...props}
                    />
                </View>

            ) : (
                // Existing TextInput with Date/Time and Password handling
                <View className="w-full h-16 px-4 bg-slate-100 rounded-xl border-2 border-slate-200 focus:border-primary flex flex-row items-center">
                    <TextInput
                        className="flex-1 text-black font-psemibold text-base"
                        value={value} // Display the selected date or time here
                        placeholder={placeholder}
                        placeholderTextColor="#7B7B8B"
                        onChangeText={handleChangeText}
                        secureTextEntry={title === "Password" && !showPassword}
                        editable={true} // Make input editable
                        {...props}
                    />
                    {title === "Password" && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                className="w-6 h-6"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )}
                    {title === "Date" && (
                        <TouchableOpacity onPress={openDatePicker} className="flex-row items-center">
                            <Image source={icons.calendar} className="w-6 h-6" resizeMode="contain" />
                        </TouchableOpacity>
                    )}
                    {title === "Time" && (
                        <TouchableOpacity onPress={openTimePicker} className="flex-row items-center">
                            <Image source={icons.time} className="w-6 h-6" resizeMode="contain" />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode={isTimePicker ? "time" : "date"} // Show time or date picker based on state
                    is24Hour={true}
                    display={Platform.OS === "ios" ? "spinner" : "default"} // Handle iOS/Android display
                    onChange={(event, selectedDate) => { 
                        if (selectedDate) {
                            setShowPicker(false);  // Close the picker after selection
                            setDate(selectedDate);  // Update the date state
                            
                            // Call handleChangeText with the formatted date or time
                            if (isTimePicker) {
                                handleChangeText(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                            } else {
                                handleChangeText(selectedDate.toLocaleDateString());  // Format date
                            }
                        } else {
                            setShowPicker(false);  // Close the picker without updating
                        }
                    }}
                />
            )}
        </View>
    );
};

export default FormField;
