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

var t = GLOBAL.industry_name
const equalWidth =  (width -20 )

type Props = {};
 export default class Category extends Component<Props> {
static navigationOptions =({navigation})=> ({
          title: GLOBAL.industry_name,
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:250,
            marginRight:10,
          },
      });

  constructor(props) {
    super(props)
    this.state = {
      status : '',
      industry_id : '',
      loading : '',
      moviesList: GLOBAL.category
    }
  }

  _keyExtractor = (item, index) => item.categoryID;

getDetal = (res) => {
  alert(JSON.stringify(res))
  if (res.sub_category == 0){
    GLOBAL.product =  res.product_avail
    this.props.navigation.navigate('Product')
  } else {
    GLOBAL.product =  res.sub_category
    this.props.navigation.navigate('Product')
  }
  // this.props.navigation.navigate('Product', {
  //   itemId: itemData.item.categoryID,
  //
  // });
}
  renderRowItem = (itemData) => {
alert(JSON.stringify(itemData))
    return (

     <TouchableOpacity

                  onPress={() => {
                    GLOBAL.category_name = itemData.item.category,
           GLOBAL.category =  itemData.item.categoryID,
             this.getDetal(itemData.item)

          }}>

      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'center',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:5,  width : equalWidth ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:1, elevation:2}}>


      <Image
          style={{ width: equalWidth+1, height : 180,margin :0, resizeMode:'stretch',}}
          source={{ uri: itemData.item.image }}
        />
          <View style={{flex : 1}}>
          <Text style={{color:'#e41582', fontSize: 20, marginLeft: 6 ,marginTop :6 }}>{itemData.item.category}</Text>

         <ScrollView style={{ flex: 1 ,style : 10,marginLeft: 6 ,marginTop : 3 ,marginBottom :6, marginRight:6}}>
                <HTML html={itemData.item.description} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>

        </View>
         </View>



      </TouchableOpacity>



    )
  }


   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
//    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
          this.props.navigation.addListener('willFocus',this._handleStateChange);

    // NetInfo.isConnected.fetch().done(
    //   (isConnected) => { this.setState({ status: isConnected }); }
    // );
}
componentWillUnmount() {
 //   NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}
getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
       this.setState({ moviesList: responseJson.derive_detail_inductry})

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){
store.get(GLOBAL.industry) .then((res) => this.getOFF(res) )

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

//   this.getMoviesFromApiAsync()
 };


handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          store.get(GLOBAL.industry) .then((res) => this.getOFF(res) )
          alert('You are not Connected to Internet')

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  componentWillMount() {
    alert(JSON.stringify(GLOBAL.category))
    this.setState({moviesList: GLOBAL.category.categoryID})
      const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
          this.props.navigation.addListener('willFocus',this._handleStateChange);

    //  this.setState({industry_id: itemId})
  //    {this.getMoviesFromApiAsync()}

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
      <View style={styles.container1}>

      {this.state.moviesList.length==0 &&(<Text style = {{fontSize:20, margin:10,alignSelf:'center'}}>No product available to display</Text>)}
{this.state.moviesList.length!=0 &&(        <FlatList style= {{ marginTop:0,backgroundColor:'#f2f2f2',flexGrow:0,marginBottom:7}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem}
        />)}

      </View>
    );
  }


  getMoviesFromApiAsync = () => {
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.derive_detail_industry

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    industry_id: GLOBAL.industry,

  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){

store.update(GLOBAL.industry,responseJson)

       this.setState({ moviesList: responseJson.derive_detail_inductry})
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
