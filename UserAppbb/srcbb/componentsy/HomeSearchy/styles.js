import { StyleSheet } from 'react-native';

const stylescc = StyleSheet.create({
  inputBox: {
    backgroundColor: '#ced7e5',
    margin: 10,
    // marginBottom:100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 20,
    fontWeight: '600',      // instead of giving 'bold' you also can give numarical value .....if you need less than bold
    color: '#434343',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20,     // make little bit small otherwise not seeing baby
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#dbdbdb',
    // backgroundColor:'#f0eff4'
  },
  iconContainer: {
    backgroundColor: '#b3b3b3',
    padding: 10,
    borderRadius: 25,
  },
  destinationText: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default stylescc;
