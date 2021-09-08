import React, { useRef, useState, useEffect } from 'react';
/*eslint-disable*/
import './ImageUpload.css';

const ImageUpload = (props: {id:string;
  center:boolean; onInput: (value:string)=> void;}) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      //@ts-ignore
      setPreviewUrl(fileReader.result);
    };
          //@ts-ignore
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event:any) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    props.onInput(pickedFile);
  };

  const pickImageHandler = () => {
              //@ts-ignore
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
                  //@ts-ignore
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
  
        </div>
        <button className="btn btn-outline-primary" type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
