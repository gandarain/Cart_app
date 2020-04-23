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

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      cart: [],
      refreshing: true
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.loadData()
      this.loadCart()
    })
  }

  async loadCart() {
    let cart = await AsyncStorage.getItem('cart')
    if (cart) {
      this.setState({ cart: JSON.parse(cart) })
    } else {
      this.setState({ cart: [] })
    }
  }

  loadData() {
    let product = [
      {
        id: 1,
        name: 'Masker',
        image: 'https://s2.bukalapak.com/img/74080248/w-1000/81Masker%20sensi.jpeg',
        price: 10000,
      },
      {
        id: 2,
        name: 'Hand Sanitizer',
        image: 'data:image/jpeg;base64,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',
        price: 40000,
      },
      {
        id: 3,
        name: 'Sabun Mandi Lifebuoy',
        image: 'https://img2.ralali.id/mediaflex/500/assets/img/Libraries/127542-LIFEBUOY-SABUN-CAIR-TOTAL-10-PUMP-500ML_cKkKq9XUMCeHLsOA_1561711794.jpeg',
        price: 50000,
      },
      {
        id: 4,
        name: 'Vitamin C',
        image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/9/27/6893930/6893930_47fb3958-95ac-442b-b2db-da8627e19c36.jpg',
        price: 20000,
      },
      {
        id: 5,
        name: 'Buff',
        image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//91/MTA-3093282/ck-bandana_ck-bandana-motif-1-buff-masker-multifungsi_full06.jpg',
        price: 10000,
      }
    ]

    setTimeout(() => {
      this.setState({
        product: product,
        refreshing: false
      })
    }, 3000)
  }

  onRefresh() {
    this.setState({ refreshing: true, product: [] }, () => this.loadData())
  }

  item(item) {
    return (
      <View style={{ borderRadius: 10, borderColor: '#EEEEEE', borderWidth: 1, marginVertical: 10, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', borderBottomColor: '#EEEEEE', borderBottomWidth: 1, paddingVertical: 10, paddingHorizontal: 10 }}>
          <View style={{ marginRight: 10, overflow: 'hidden', borderRadius: 10 }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '50%', backgroundColor: 'green', paddingRight: 10 }}>
            <TouchableOpacity onPress={() => this.addCart(item)} style={{ backgroundColor: 'blue', borderRadius: 5 }}>
              <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{this.renderJumlah(item)}</Text>
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
          data={this.state.product}
          renderItem={({ item }) => this.item(item)}
          keyExtractor={item => item.id}
        />
      </Fragment>
    )
  }
}

export default HomeScreen