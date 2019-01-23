import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList,StatusBar,ScrollView,ActivityIndicator, Text, View ,StyleSheet,TouchableOpacity,Alert,Image,Dimensions} from 'react-native';
import { fetchMusic } from '../actions/MusicActions';

class HomePage extends Component {
  
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
      }
      
      showItems=(a,b,c,d)=>{
        const { navigation } = this.props;
        navigation.navigate('MusicItem', {
            cover:a,title:b,audioUrl:c});
      };
      
      componentDidMount() {
        this.props.fetchMusic();
      }

      render() {
        let result = this.props.result;
       let content = result.isFeching ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        ""
      );
        return (
        <View style={styles.container}>
         <StatusBar hidden={true} />
        <View style={styles.center}>
        <Text style={styles.title}>Skoovin'</Text>
        </View>
        <ScrollView>
        <View>
          <FlatList 
             data={this.props.result.data.payload}
            renderItem={({item}) => 
            <View style={styles.viewItem}>
             <TouchableOpacity  onPress={this.showItems.bind(this,item.cover,item.title,item.audio,item)}
               style={ styles.item }>
                 <Image
                   style={ styles.image }
                   source={{uri:item.cover}}
                 /> 
            <Text style={styles.t1}>{item.title} </Text>
            </TouchableOpacity>
            </View>  
            }
          /> 
          </View>
          </ScrollView>
        </View>
        );
    }
}

const mapStateToProps = state => {
  return {
    result: state.music,
  };
};

export default connect(
  mapStateToProps,
  { fetchMusic }
)(HomePage);

const styles = StyleSheet.create({
    container:{
        flex: 1,   
        backgroundColor:'#D3D3D3',    
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    center:{
        backgroundColor: 'white',
        height:'5%',
        width:'100%',    
        backgroundColor:'#00cc00'
    },
    title:{
      textAlign: 'center', 
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 10
    },
    t1:{
      color:'#2d3138',
      fontWeight:'bold',
      alignItems:'center',
      textAlign: 'center',
      fontSize: 15
    },
    item: {
      width: 350,
      height:200,
      backgroundColor: '#b2beb5',
      borderRadius:10,
      padding:10
    },
    image: {
      flex: 1.8,
      transform: [{ scale: 0.90 }],
      resizeMode: 'cover', 
    },
    viewItem:{
      borderRadius:10,
      padding:10,
      margin:5
    }
    });