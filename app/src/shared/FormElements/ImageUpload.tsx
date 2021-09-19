import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';

type ImageUploadProps = {
  id:string;
  center:boolean;
  onInput: (value:string)=> void;
  previewUrl?: string;
}

const ImageUpload = (props: ImageUploadProps) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.previewUrl);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event:any) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
    }
    props.onInput(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
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
