import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 5,
    width: '100%',
  },
  button: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandedContainer: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#f0f0f0',
  },
});
