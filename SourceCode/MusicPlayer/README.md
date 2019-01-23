# Music Player

## Clone & Setup
```
git clone https://github.com/priyangamani/MusicPlayerApp/tree/master

cd MusicPlayer
npm install
react-native link
react-native run-ios
react-native run-android
```



**Android (Generate app-release.apk)**
- Ensure you have successfully run at least once in Android Studio (to avoid gradle sync fail issue)
- Run the command below, enter new version
```
cd android
gradlew clean
