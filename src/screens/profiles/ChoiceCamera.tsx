import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  SectionComponent,
} from '../../components';

const ChoiceCamera = ({navigation, route}: any) => {
  const [data, setdata] = useState<{
    width: number;
    height: number;
  }>();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (route.params.width && route.params.height) {
      const {width, height} = route.params;

      setdata({width, height});
    }

    if (route.params.imageUrl) {
      setImageUrl(route.params.imageUrl);
    }
  }, [route.params]);

  console.log(data, imageUrl);

  return (
    <ContainerComponent>
      <SectionComponent>
        <Text>ChoiceCamera</Text>
        <ButtonComponent
          text="go to camera"
          onPress={() =>
            navigation.navigate('CameraScreen', {
              width: data?.width,
              height: data?.height,
            })
          }
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ChoiceCamera;
