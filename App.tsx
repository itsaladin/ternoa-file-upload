import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from './src/components/Button';
import {COLORS, SIZES} from './src/constant/Index';
import {fileUpload} from './src/service/Index';

const FileSection: React.FC<{
  title: string;
}> = ({children, title}) => {
  return (
    <View style={styles.fileSectionContainer}>
      <Text style={[styles.fileSectionTitle]}>{title} : </Text>
      <Text style={[styles.fileSectionDescription]}>{children}</Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'light';
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(false);
  const [imageInfo, setImageInfo] = useState({
    height: 0,
    uri: '',
    width: 0,
    fileName: '',
    type: '',
    fileSize: 0,
  });

  // image Library options
  const options = {
    title: 'select image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    if (images !== null) {
      //@ts-ignore
      setImageInfo(images?.assets![0]);
    } else {
      console.log('Image not selected');
    }
  };

  // file upload to comapany's specified server
  const uploadSelectedImg = async () => {
    let prog = 15;
    setProgress(prog);
    setIndeterminate(false);

    // img upload progress
    prog += Math.random() / 5;
    if (prog > 1) {
      prog = 50;
    }
    setProgress(prog);

    const formdata = new FormData();
    formdata.append('file', {
      uri: imageInfo?.uri,
      type: imageInfo?.type,
      name: imageInfo?.fileName,
    });

    // file upload service handler
    fileUpload(formdata, setImageInfo, setIndeterminate, setProgress);
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{margin: SIZES.h2}}>
        <View style={styles.container}>
          <Text style={styles.headerTxt}>Ternoa File Upload</Text>
          <View>
            <FileSection title="selected file name">
              {imageInfo?.fileName}
            </FileSection>
            <FileSection title="selected file path">
              {imageInfo?.uri}
            </FileSection>
            <FileSection title="selected file size">
              {imageInfo?.fileSize > 0 ? imageInfo?.fileSize : ''}
            </FileSection>
          </View>
          <View
            style={{
              marginTop: SIZES.height / 15,
              marginBottom: SIZES.height / 7,
            }}>
            <Button
              bgColor={Colors.white}
              width={140}
              onPress={openGallery}
              text="Select File"
            />
          </View>

          <Progress.Bar
            style={styles.progressBar}
            height={18}
            width={200}
            color={COLORS.primary}
            progress={progress}
            indeterminate={indeterminate}
          />

          <Button
            disabled={imageInfo?.uri === '' ? true : false}
            bgColor={Colors.white}
            width={200}
            text="Upload Select File"
            onPress={uploadSelectedImg}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: COLORS.white},
  container: {flex: 1},
  headerTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 30,
  },
  fileSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fileSectionDescription: {
    fontSize: 18,
  },
  progressBar: {alignSelf: 'center', marginBottom: 30},
  highlight: {
    fontWeight: '700',
  },
});

export default App;
