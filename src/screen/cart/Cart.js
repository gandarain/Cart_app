import React, { Fragment, Component } from 'react'
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'

class CartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      refreshing: true
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.loadCart()
    })
  }

  async loadCart() {
    let cart = await AsyncStorage.getItem('cart')
    if (cart) {
      this.setState({ cart: JSON.parse(cart), refreshing: false })
    } else {
      this.setState({ cart: [], refreshing: false })
    }
  }

  onRefresh() {
    this.setState({ refreshing: true, cart: [] }, () => this.loadCart())
  }

  item(item) {
    return (
      <View style={{ borderRadius: 10, borderColor: '#EEEEEE', borderWidth: 1, marginVertical: 10, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', borderBottomColor: '#EEEEEE', borderBottomWidth: 1, paddingVertical: 10, paddingHorizontal: 10 }}>
          <View style={{ marginRight: 10 }}>
            <Image source={{ uri: item.image }} style={{ height: 100, width: 100 }} />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 18 }}>Rp {item.price}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Keranjang</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
            <TouchableOpacity onPress={() => this.addCart(item)} style={{ backgroundColor: 'blue', borderRadius: 5 }}>
              <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.renderJumlah(item)}</Text>
            </View>
            <TouchableOpacity onPress={() => this.minusCart(item)} style={{ backgroundColor: 'red', borderRadius: 5 }}>
              <Icon name="minus" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  async addCart(data) {
    let cart = await AsyncStorage.getItem('cart')
    let finalCart = []
    if (cart) {
      cart = JSON.parse(cart)
      let findProduct = cart.findIndex(cartData => cartData.id === data.id)
      if (findProduct === -1) {
        data.jumlah = 1
        cart.push(data)
      } else {
        cart[findProduct].jumlah += 1
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart))
    } else {
      data.jumlah = 1
      finalCart.push(data)
      await AsyncStorage.setItem('cart', JSON.stringify(finalCart))
    }
    this.loadCart()
  }

  async minusCart(data) {
    let cart = await AsyncStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
      let findProduct = cart.findIndex(cartData => cartData.id === data.id)
      if (findProduct === -1) {
        return (
          Alert.alert('Error', 'Anda belum memilih product ini')
        )
      } else {
        if (cart[findProduct].jumlah - 1 === 0) {
          cart.splice(findProduct, 1)
        } else {
          cart[findProduct].jumlah -= 1
        }
        await AsyncStorage.setItem('cart', JSON.stringify(cart))
      }
    } else {
      return (
        Alert.alert('Error', 'Anda belum memilih product apa pun')
      )
    }
    this.loadCart()
  }

  renderJumlah(data) {
    if (this.state.cart) {
      let findProduct = this.state.cart.findIndex(cartData => cartData.id === data.id)
      if (findProduct === -1) {
        return 0
      } else {
        return this.state.cart[findProduct].jumlah
      }
    } else {
      return 0
    }
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor={'green'} />
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>List Product</Text>
        </View>
        <FlatList
          style={{ marginHorizontal: 20, marginVertical: 10 }}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.refreshing}
          data={this.state.cart}
          renderItem={({ item }) => this.item(item)}
          keyExtractor={item => item.id}
        />
      </Fragment>
    )
  }
}

export default CartScreen