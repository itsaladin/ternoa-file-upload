import {Alert} from 'react-native';
import {BaseApiUrl} from '../constant/ApiEndPoint';

export const fileUpload = async (
  formdata: any,
  setImageInfo: any,
  setIndeterminate: any,
  setProgress: any,
) => {
  try {
    let res = await fetch(BaseApiUrl, {
      method: 'POST',
      body: formdata,
      headers: {'Content-Type': 'multipart/form-data'},
    });
    let responseJson = await res;

    if (responseJson?.status === 200 && responseJson?.ok === true) {
      Alert.alert('File upload successfull', 'file uploaded', [
        {
          text: 'Cancel',
          onPress: () => {
            setImageInfo({
              height: 0,
              uri: '',
              width: 0,
              fileName: '',
              type: '',
              fileSize: 0,
            });
            setProgress(0);
            setIndeterminate(false);
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setImageInfo({
              height: 0,
              uri: '',
              width: 0,
              fileName: '',
              type: '',
              fileSize: 0,
            });
            setProgress(0);
            setIndeterminate(false);
          },
        },
      ]);
    } else {
      console.log('File uploading failed !!!');
      Alert.alert('File uploading failed !!!', 'Try again ..', [
        {
          text: 'Cancel',
          onPress: () => {
            setImageInfo({
              height: 0,
              uri: '',
              width: 0,
              fileName: '',
              type: '',
              fileSize: 0,
            });
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setImageInfo({
              height: 0,
              uri: '',
              width: 0,
              fileName: '',
              type: '',
              fileSize: 0,
            });
          },
        },
      ]);
    }
  } catch (err) {
    console.log('isCheckOutBtnEnable Error', err);
  }
};
