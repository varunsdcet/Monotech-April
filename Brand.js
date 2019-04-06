import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  NetInfo,
  Linking,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import store from 'react-native-simple-store';

const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import HTML from 'react-native-render-html';


const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )

 class Brand extends Component {
static navigationOptions = {
          title: 'Brands',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:100
          },
      };

  constructor(props) {
    super(props)
    this.state = {
      status : '',
      industry_id : '',
      loading : '',
      moviesList: []
    }
  }

  getOFF =(responseJson)=>{
  alert(JSON.stringify(responseJson))
//  alert(JSON.stringify(responseJson))
       this.setState({ moviesList: responseJson.brands})

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){

  store.get('brandsim') .then((res) => this.getOFF(res) )



  }

});

function handleFirstConnectivityChange(isConnected) {
 // alert('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);
  store.get('brandsim') .then((res) => this.getOFF(res) )
  // this.getMoviesFromApiAsync()
 };


  _keyExtractor = (item, index) => item.categoryID;

  renderRowItem = (itemData) => {

    return (

      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    alignItems: 'center',
    shadowRadius: 0.5,
    flexDirection:'column',
    shadowOpacity: 0.5, backgroundColor:'white',borderRadius:5,  width : equalWidth ,marginLeft : 5,marginRight:5,marginTop:5,marginBottom:5, elevation:2}}>
      <Image
          style={{ width: 120, height : 180, alignSelf:'center',resizeMode:'contain',marginTop:-30}}
          source={{ uri: itemData.item.image }}/>
          <View style={{marginTop:-30}}>
          <Text style={{color:'#e41582', fontSize: 15,textAlign:'center',marginTop:-10, marginLeft:6, marginRight:6}}>{itemData.item.brand}</Text>
          <TouchableOpacity onPress={()=>Linking.openURL(itemData.item.url)}>
                  <Text style={{color:'#e41582', fontSize: 15,textAlign:'center',margin:6}}>{itemData.item.url}</Text>
                  </TouchableOpacity>
        </View>
         </View>


    )
  }


   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);


}
componentWillUnmount() {
    // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  componentWillMount() {
    //   const { navigation } = this.props;
    // const itemId = navigation.getParam('itemId', 'NO-ID');
    //      this.props.navigation.addListener('willFocus',this._handleStateChange);
    //
    //   this.setState({industry_id: itemId})
      store.get('brandsim') .then((res) => this.getOFF(res) )
        // NetInfo.isConnected.fetch().done(
        //   (isConnected) => { this.setState({ status: isConnected }); }
        // );
      //       this.props.navigation.addListener('willFocus',this._handleStateChange);
      // {this.getMoviesFromApiAsync()}

  }


  render() {
     if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }
    return (
      <View style={{flex:1, flexDirection:'column',backgroundColor:'#f2f2f2', width:window.width, height:window.height}}>
        <FlatList style= {{ marginTop:0,backgroundColor:'#f2f2f2', marginTop:5, marginLeft:5, marginBottom:5, marginRight:5}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />
      </View>

    );
  }


  getMoviesFromApiAsync = () => {
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.get_all_brands

      fetch(url, {
  method: 'GET',

}).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson[0].status == true){
        store.update('brands',responseJson)

       this.setState({ moviesList: responseJson[0].brands})
      }

       this.hideLoading();
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
    });
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column'
  }
});
export default Brand;
