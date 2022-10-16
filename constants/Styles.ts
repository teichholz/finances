import { StyleSheet, Dimensions } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export const css = {
  margin: (rvalue: String) => {
    return { margin: rvalue, }
  },

  styles: StyleSheet.create({
    flex1: {
      flex: 1,
    },
    flexRow: {
      flexDirection: "row",
    },
    flexRowCenter: {
      flexDirection: "row",
      justifyContent: "center"
    },
    alignItemsCenter: {
      alignItems: "center",
    },
    flexRowCenterCenter: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    flexRowSpaceBetween: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    flexRowSpaceAround: {
      flexDirection: "row",
      justifyContent: "space-around"
    },
    flexRowSpaceEvenly: {
      flexDirection: "row",
      justifyContent: "space-evenly"
    },
    flexRowReverse: {
      flexDirection: "row-reverse",
    },
    flexColumn: {
      flexDirection: "column",
    },
    flexColumnCenter: {
      flexDirection: "column",
      justifyContent: "center"
    },
    flexColumnSpaceBetween: {
      flexDirection: "column",
      justifyContent: "space-between"
    },
    flexColumnSpaceAround: {
      flexDirection: "column",
      justifyContent: "space-around"
    },
    flexColumnSpaceEvenly: {
      flexDirection: "column",
      justifyContent: "space-evenly"
    },
    flexColumnReverse: {
      flexDirection: "column-reverse",
    },
  }),
};

