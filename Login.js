import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
import OfflineNotice from './OfflineNotice.js';
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';
const Realm = require('realm');
type Props = {};
 class Login extends Component<Props> {


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);

  }



 	static navigationOptions = {
    title: 'Login',
    header: null
  };

  constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      username: '',
      password: '',
      status :'',
      ipAdd : '',
      loading:'',
      states:'',
      results: [],


    }
}


showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    buttonClickListener = () =>{
//      alert(GLOBAL._token)
     var k =  AsyncStorage.getItem('token');
   DeviceInfo.getIPAddress().then(ip => {
     this.setState({ipAdd:ip})
});

    if (this.state.username == ''){
      alert('Please Enter Username')
    }    else if (this.state.password == ''){
      alert('Please Enter Password')
    }  else {
      const url = GLOBAL.BASE_URL +  GLOBAL.Signin
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: this.state.username,
    password: this.state.password,
    deviceID: DeviceInfo.getUniqueID(),
    deviceType: Platform.OS,
    deviceToken: GLOBAL._token,
    model_name: DeviceInfo.getModel(),
    carrier_name: DeviceInfo.getCarrier(),
    device_country: DeviceInfo.getDeviceCountry(),
    device_memory: DeviceInfo.getTotalMemory(),
    has_notch: DeviceInfo.hasNotch(),
    manufacture: DeviceInfo.getManufacturer(),
    ip_address: this.state.ipAdd,

  }),
}).then((response) => response.json())
    .then((responseJson) => {

        alert(JSON.stringify(responseJson))
       this.hideLoading()
       if (responseJson.status == true) {

      this.setState({ results: responseJson.user_detail })



       AsyncStorage.setItem('userID', this.state.results.userID);
       AsyncStorage.setItem('image', this.state.results.image);
       AsyncStorage.setItem('name', this.state.results.name);
       AsyncStorage.setItem('email', this.state.results.email);
       AsyncStorage.setItem('mobile', this.state.results.mobile);


        this.props.navigation.navigate('DrawerNavigator')
       }
       else{
        alert('Invalid Credentials!')
       }
    })
    .catch((error) => {
      console.error(error);
    });
    }
  }

componentWillMount(){

     var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{

    if (e == '' || e == null ){

    }else {
       this.props.navigation.replace('DrawerNavigator')
    }

    })

}

componentDidMount() {

}
componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
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
    <KeyboardAwareScrollView style={styles.containers} enableOnAndroid={true} keyboardShouldPersistTaps='always'>

   <Text >

        </Text>

          <Image style={styles.logoImage}
           source={require('./logins.png')} />
                <View style={styles.viewBackground}>
                           <Image style={styles.icon}
                             source={require('./username.png')} />
                                <TextInput   style={styles.welcome1}
                                   placeholder="Mobile/Email"
                                   autoCapitalize={'none'}
                                  onChangeText={(text) => this.setState({username:text})}
                                   />

                 </View>


                  <View style={styles.passwordviewBackground}>
                           <Image style={styles.icon}
                             source={require('./password.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="Password"
                                    secureTextEntry={true}
                                  onChangeText={(text) => this.setState({password:text})}
                                   />

                 </View>


          <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}
          onPress={this.buttonClickListener}
        >

         Sign In
        </Button>

        <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 6,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#ffffff'}}

            style={{fontSize: 14, color: 'darkgrey'}}

           onPress={() =>    this.props.navigation.navigate('Forget')}>
            Forgot Password?
           </Button>



          <TouchableOpacity  onPress={() =>  this.props.navigation.navigate('Signup')}>

         <Text style={styles.createaccount} >

        <Text style={styles.account} >
        Don't have an account?
        </Text>
        &nbsp;Create One
        </Text>
        </TouchableOpacity>



     </KeyboardAwareScrollView>
    );
  }
}
export default Login;
