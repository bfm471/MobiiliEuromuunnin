import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

import { handleFetch } from "../services/apiService";
import { Picker } from '@react-native-picker/picker';
import eurocoin from '../assets/eurocoin.jpg'

export default function PickerComp() {
    const [amount, setAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState();
    const [currencyData, setCurrencyData] = useState({});
    const [result, setResult] = useState('');

    useEffect(() => {
        handleFetch(selectedCurrency, amount)
            .then(data => setCurrencyData(data.rates))
            .catch(e => console.error(e));
    }, [])

    const handlePress = () => {
        const rate = currencyData[selectedCurrency];
        setResult((amount / rate).toFixed(2));

    }

    return (
        <>
            <View style={styles.resultContainer}>
                <Image
                    source={eurocoin}
                    style={styles.img}
                />
                {result != '' && <Text style={styles.result}>{result} €</Text>}
            </View>
            <View style={styles.pickerContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="enter amount"
                    value={amount}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChangeText={text => setAmount(Number(text))}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={selectedCurrency}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCurrency(itemValue)
                    }>
                    {
                        Object.keys(currencyData).map((currency, itemIndex) =>
                            <Picker.Item key={itemIndex} label={currency} value={currency} />)
                    }
                </Picker>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="CONVERT" onPress={handlePress} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        height: 170,
        width: 170,
        marginBottom: 20
    },
    result: {
        fontSize: 20,
        fontWeight: "bold"
    },
    pickerContainer: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontSize: 18
    },
    picker: {
        height: 100,
        width: 120,
    },
    buttonContainer: {
        flex: 1
    }
});