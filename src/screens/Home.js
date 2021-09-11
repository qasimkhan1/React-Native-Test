import React, { Component } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";
import { styles } from "../styles";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      isChecked: false,
      sizeValue: null,
      filterValue: "",
      colorsList: [],

      productsList: [],
      cuurentList: [],
      totalPrice: 0,
    };
  }
  getUniqueArray = (arr = [], compareProps = []) => {
    let modifiedArray = [];
    if (compareProps.length === 0 && arr.length > 0)
      compareProps.push(...Object.keys(arr[0]));
    arr.map((item) => {
      if (modifiedArray.length === 0) {
        modifiedArray.push(item);
      } else {
        if (
          !modifiedArray.some((item2) =>
            compareProps.every(
              (eachProps) => item2[eachProps] === item[eachProps]
            )
          )
        ) {
          modifiedArray.push(item);
        }
      }
    });
    return modifiedArray;
  };
  getProductsList = () => {
    fetch(
      "https://my-json-server.typicode.com/benirvingplt/products/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        let temp = [];
        let newArray = res;

        res.map((item) => {
          temp.push({ color: item.colour });
        });
        newArray.map((item) => {
          item.price = Math.ceil(item.price);
          item["qty"] = 0;
        });
        this.setState({
          productsList: newArray,
          cuurentList: newArray,
          colorsList: this.getUniqueArray(temp),
        });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };
  handleChange = (itemValue) => {
    let temp = [];
    temp = this.state.productsList.filter((item) => {
      if (item.colour == itemValue) {
        return item;
      }
    });
    if (itemValue !== "") {
      this.setState({ filterValue: itemValue, cuurentList: temp });
    } else {
      this.setState({ filterValue: "", cuurentList: this.state.productsList });
    }
  };
  addProduct = (item, index) => {
    let temp = this.state.cuurentList;

    temp[index].qty = temp[index].qty + 1;

    this.setState({
      currentList: temp,
      totalPrice: this.state.totalPrice + item.price,
    });
  };
  removeProduct = (item, index) => {
    let temp = this.state.cuurentList;

    if (temp[index].qty > 0) {
      temp[index].qty = temp[index].qty - 1;

      this.setState({
        currentList: temp,
        totalPrice: this.state.totalPrice - item.price,
      });
    }
  };
  removeAll = (item, index) => {
    let temp = this.state.cuurentList;

    if (temp[index].qty > 0) {
      let itemPrice = item.qty * item.price;
      temp[index].qty = 0;

      this.setState({
        currentList: temp,
        totalPrice: this.state.totalPrice - itemPrice,
      });
    }
  };

  componentDidMount() {
    this.getProductsList();
  }

  render() {
    const { colorsList, cuurentList } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {colorsList.length !== 0 ? (
            <View style={styles.filterContainer}>
              <Picker
                selectedValue={this.state.filterValue}
                onValueChange={(itemValue) => this.handleChange(itemValue)}
              >
                <Picker.Item label={"Color Filter"} value={""} />

                {colorsList.map((item) => (
                  <Picker.Item label={item.color} value={item.color} />
                ))}
              </Picker>
            </View>
          ) : null}
          {cuurentList.length !== 0
            ? cuurentList.map((item, index) => (
                <View>
                  <View style={styles.listRow}>
                    <View style={styles.imageContainer}>
                      <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{
                          uri: item.img,
                        }}
                      />
                    </View>
                    <View style={styles.productInfoContainer}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <Text style={styles.productPrice}>
                        £Price : {item.price}
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: 8,

                        flex: 1,
                      }}
                    >
                      <View style={styles.actionContainer}>
                        <TouchableOpacity
                          onPress={() => this.removeProduct(item, index)}
                        >
                          <Text style={styles.fontSize24}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.removeAllContainer}>
                          <Text>{item.qty}</Text>
                          <TouchableOpacity
                            onPress={() => this.removeAll(item, index)}
                          >
                            <Text style={styles.remove}>Remove</Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          onPress={() => this.addProduct(item, index)}
                        >
                          <Text style={styles.fontSize24}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            : null}
          {cuurentList.length !== 0 ? (
            <View style={styles.totalCountContainer}>
              <Text style={styles.fontSize24}>
                £Total : {this.state.totalPrice}
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}
