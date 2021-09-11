import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingVertical: 32,
  },
  filterContainer: {
    justifyContent: 'center',
  },
  listRow: {flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'},
  imageContainer: {
    flex: 1,
    marginTop: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
  },
  productInfoContainer: {
    padding: 8,
    flex: 1,
  },
  productName: {fontSize: 16},
  productPrice: {
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  fontSize24: {
    fontSize: 24,
  },
  removeAllContainer: {
    alignItems: 'center',
  },
  remove: {
    fontSize: 14,
    color: 'blue',
  },
  totalCountContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
