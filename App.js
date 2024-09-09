import { StyleSheet, View } from 'react-native';
import PickerComp from './components/Picker';

export default function App() {


  return (
    <View style={styles.container}>
      <PickerComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
