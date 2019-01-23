import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,Alert,TouchableOpacity,Image,Dimensions,ImageBackground
} from 'react-native';
import SeekBar from './SeekBar';
import Video from 'react-native-video';
import { connect } from 'react-redux';

class MusicItem extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}

  setDuration(data) {
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }
  

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.props.navigation.state.params.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  }

  renderVolumeControl(volume) {
    const isSelected = (this.state.volume == volume);
    return (
    <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
    <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
    {volume * 100}
    </Text>
    </TouchableOpacity>
    )
    }

  render() {
    const audioUrl = this.props.navigation.state.params.audioUrl;
    const title = this.props.navigation.state.params.title;
    const cover = this.props.navigation.state.params.cover;
    const video = this.state.isChanging ? null : (
      <Video source={{uri:audioUrl}} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}
        volume={this.state.volume}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
        <TouchableOpacity onPress={this.handleBackButtonClick}>
          <Image style={styles.button}
            source={require('../img/ic_keyboard_arrow_down_white.png')} />
        </TouchableOpacity>
        <Text style={styles.message}>{title.toUpperCase()}</Text>
        <TouchableOpacity>
        <Image style={styles.button}
          source={require('../img/ic_queue_music_white.png')} />
        </TouchableOpacity>
     </View>
      <View>
     <ImageBackground source={{uri: cover}} style={styles.image}>
        <View style={styles.imagePosition}>
        {!this.state.paused ?
            <TouchableOpacity onPress={() => this.setState({paused: true})}>
              <View style={styles.playButton}>
                <Image source={require('../img/ic_pause_white_48pt.png')}/>
              </View>
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => this.setState({paused: false})}>
              <View style={styles.playButton}>
                <Image source={require('../img/ic_play_arrow_white_48pt.png')}/>
              </View>
            </TouchableOpacity>
           }
        </View>
      </ImageBackground>
      </View>
     <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} />

       <View style={styles.volumeControl}>
       <Image source={require('../img/ic_speaker.png')}/>
        {this.renderVolumeControl(0.5)}
        {this.renderVolumeControl(1)}
        {this.renderVolumeControl(1.5)}
       </View>
        {video}
      </View>
    );
  }
}
const { width, height } = Dimensions.get('window');
const imagewidth = width;
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  header: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  image: {
    transform: [{ scale: 1.0 }],
    resizeMode: 'cover', 
    width:imagewidth,
    height:imagewidth,
  },
  playButton: {
    height: 100,
    width: 100,
    borderWidth: 10,
    borderColor: '#D3D3D3',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    opacity: 0.72
  },
  volumeControl: {
    flex: 1,
    margin:10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlOption: {
      alignSelf: 'center',
      fontSize: 11,
      color: "white",
      paddingLeft: 2,
      paddingRight: 2,
      lineHeight: 12,
  },
  imagePosition:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
};

const mapStateToProps = state => {
  return { colorName: state.colorName };
};

export default connect(mapStateToProps)(MusicItem);