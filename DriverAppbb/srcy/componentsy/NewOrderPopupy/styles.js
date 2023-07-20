import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#00000099',
  },
  popupContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  minutes: {
    color: 'lightgrey',
    fontSize: 36
  },
  distance: {
    color: 'lightgrey',
    fontSize: 26
  },
  uberType: {
    color: 'lightgrey',
    fontSize: 20,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBg: {
    backgroundColor: '#008bff',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,

    // own explore: baby
    borderWidth:4,
    borderTopWidth:0,
    borderColor:'white',
    transform: [{
      rotate: '30deg'
    }]
  },
  //:the GENIUS: boy
  userIcony: {
    transform: [{
      rotate: '-30deg'
    }]
  },


  declineButton: {
    backgroundColor: 'black',
    padding: 10,
    paddingVertical:5,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
  },
  declineText: {
    color: 'white',
    fontWeight:'200',
    fontSize:18
  }
});

export default styles;
