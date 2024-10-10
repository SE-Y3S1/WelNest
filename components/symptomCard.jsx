import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { icons } from '../constants';

const SymptomCard = ({ symptom, note, date, time, severity, onEdit, onDelete }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Mild':
                return '#00d12e';
            case 'Moderate':
                return '#ffa500';
            case 'Severe':
                return '#ff0000';
            default:
                return '#efefef';
        }
    };

    return (
        <View className="w-[359px] h-[226px] mb-7">
            <View className="w-[100%] h-[100%] absolute bg-[#e0e0e0] rounded-[10px] shadow p-4">
                <View className="w-[289.34px] h-[49px] absolute flex-col justify-start items-start mb-4 gap-2" style={{ left: 35.36, top: 22 }}>
                    <Text className="text-black text-xl font-semibold leading-normal tracking-wide">{symptom}</Text>
                    <Text className="text-black text-lg font-normal leading-none tracking-wide">{note}</Text>
                </View>
                <View className="w-[289.34px] h-12 absolute justify-start items-start gap-x-28 flex-row mb-4" style={{ left: 35.36, top: 86 }}>
                    <View className="flex-col justify-start items-start">
                        <Text className="text-black text-base font-psemibold leading-none tracking-wide">Date</Text>
                        <Text className="text-black text-base font-semibold leading-normal tracking-wide">{date}</Text>
                    </View>
                    <View className="flex-col justify-start items-start">
                        <Text className="text-black text-base font-psemibold leading-none tracking-wide">Time</Text>
                        <Text className="text-black text-base font-semibold leading-normal tracking-wide">{time}</Text>
                    </View>
                </View>
                <View className="w-[90.02px] h-6 absolute" style={{ left: 35.36, top: 149 }}>
                    <View style={{ backgroundColor: getSeverityColor(severity) }} className="w-[90.02px] h-6 rounded-[10px]"></View>
                    <Text className="w-[53.58px] h-[17px] absolute text-center text-white text-[13px] font-bold" style={{ left: 19.29, top: 4 }}>
                        {severity}
                    </Text>
                </View>
                <View style={{ flex: 1 }} />
                <View className="flex-row justify-end">
                    <TouchableOpacity onPress={onEdit} className="mr-4">
                        <Image source={icons.pencil} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete} className="mr-4">
                        <Image source={icons.bin} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SymptomCard;
