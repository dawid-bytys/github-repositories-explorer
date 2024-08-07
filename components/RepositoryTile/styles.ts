import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
  },
  stars: {
    fontFamily: 'Poppins-Medium',
  },
  description: {
    marginTop: 10,
    fontSize: 12,
  },
  titleContainer: {
    flex: 1,
  },
});
