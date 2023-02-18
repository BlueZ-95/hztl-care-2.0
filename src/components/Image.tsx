import { ImageField,NextImage,TextField,Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ImageProps = ComponentProps & {
    fields: {
      Image: ImageField;
      ImageCaption: TextField;
    };
  };
const ImageBlock = ({fields}:ImageProps): JSX.Element => {
  console.log(fields);
  return (
  <div className='test'>
    <NextImage className="image" field={fields.Image}></NextImage>
    <Text field={fields.ImageCaption}></Text>
  </div>
  );

};

export default ImageBlock;
