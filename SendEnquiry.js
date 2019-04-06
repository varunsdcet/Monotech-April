import React, {Component} from 'react';
import {Platform, StyleSheet, Text,AsyncStorage,NetInfo,ActivityIndicator, View ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import store from 'react-native-simple-store';


type Props = {};
 class SendEnquiry extends Component<Props> {


static navigationOptions=({navigation})=> ({
          title: 'Consumable Details',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:200
          },
      });




  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: GLOBAL.userInfo.user_detail.name,
      email: GLOBAL.userInfo.user_detail.email,
      businees:  GLOBAL.userInfo.user_detail.organisation,
      message: '',
      cno:GLOBAL.userInfo.user_detail.mobile,
      city: '',
      state: '',
      userid: '',
      description: '',
      status :'',
      loading :'',mname:'', mnumber:''
    }
}

   componentDidMount() {
  //this.getOFF(GLOBAL.userInfo)
  //this.props.navigation.addListener('willFocus',this.getOFF(GLOBAL.userInfo));


//    this.getMoviesFromApiAsync();
//    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

    _handleStateChange = state => {

         //store.get('get_profile') .then((res) => this.getOFF(res) )
    }
  componentWillUnmount() {
  //  store.delete('get_profile')
 }
getOFF =responseJson=>{
//  alert(JSON.stringify(responseJson))
    this.setState({name:responseJson.user_detail.name})
    this.setState({businees:responseJson.user_detail.organisation})
    this.setState({email:responseJson.user_detail.email})
    this.setState({businessaddress:responseJson.user_detail.businessaddress})
    this.setState({business:responseJson.user_detail.organisation})
    this.setState({cno: responseJson.user_detail.mobile})

}

  buttonClickListener = () =>{

    if (this.state.name == ''){
      alert('Please Enter Name')
    }  else if (this.state.businees == ''){
      alert('Please Enter Company Name')
    }
        else if (this.state.email == ''){
      alert('Please Enter Email')
    } else if (this.state.cno == ''){
      alert('Please Enter Contact Number')
    }
       else if (this.state.city == ''){
      alert('Please Enter City')
    } else if (this.state.state == ''){
      alert('Please Enter State')
    } else if (this.state.mname == ''){
      alert('Please Enter Machine Name')
    } else if (this.state.mnumber == ''){
      alert('Please Enter Machine Serial No.')
    }
     else if (this.state.description == ''){
      alert('Please Enter Description')
    }

      else {
      this.showLoading();
      const url = GLOBAL.BASE_URL +  GLOBAL.submit_consumable_request
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: this.state.userid,
    name: this.state.name,
    mobile: this.state.cno,
    email: this.state.email,
    machine_name: this.state.mname,
    machine_serial: this.state.mnumber,
    business_name: this.state.businees,
    city:this.state.city,
    state:this.state.state,
    description:this.state.description,


  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {
//alert(JSON.stringify(responseJson))
       Alert.alert('Thank You!','Your Enquiry has been Successfully Submitted. We will reach you soon!')




       }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }
  }
showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
}


  render() {
 var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{
     this.setState({userid:e})
    })

    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }
    return (
    <KeyboardAwareScrollView style={styles.container2}
    keyboardShouldPersistTaps='always'>

      <View style={{ padding :5, shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,borderRadius: 4,backgroundColor : '#ffffff',margin:10,width :window.width - 20, flex: 1, }}>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45}}
                                   placeholder="Name"
                                   placeholderTextColor='grey'
                                   value={this.state.name}
                                  onChangeText={(text) => this.setState({name:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>


          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45}}
                                   placeholder="Company Name"
                                  value={this.state.businees}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({businees:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45}}
                                   placeholder="Email"
                                   placeholderTextColor='grey'
                                   autoCapitalize={'none'}
                                   value={this.state.email}
                                  onChangeText={(text) => this.setState({email:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45}}
                                   placeholder="Contact No."
                                   keyboardType='numeric'
                                   maxLength={10}
                                   value={this.state.cno}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({cno:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45}}
                                   placeholder="City"
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({city:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45,height:45}}
                                   placeholder="State"
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({state:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>



          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45}}
                                   placeholder="Machine Name"
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({mname:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>



          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:45}}
                                   placeholder="Machine Serial No."
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({mnumber:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>


          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000',height:100}}
                                   placeholder="Description"
                                    textAlignVertical={'top'}
                                   multiline={true}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({description:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

         <Button
           containerStyle={{margin: 6,marginBottom:15,marginTop : 20,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}

          onPress={this.buttonClickListener}>
        SEND
        </Button>


        </View>






     </KeyboardAwareScrollView>
    );
  }
}
export default SendEnquiry;
