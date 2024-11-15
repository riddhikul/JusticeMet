// styles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  buttonContainer: {
    padding: 20,
  },
  mainButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
