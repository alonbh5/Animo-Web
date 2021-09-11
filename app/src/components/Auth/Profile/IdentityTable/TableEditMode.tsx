import { useEffect, useState, useContext } from 'react';
import validator from 'validator';
import Input from '../../../../shared/FormElements/Input';
import { User } from '../../../api/configuration/models/users';
import AuthContext from '../../../../shared/context/auth-context';
import { uploadImage } from '../../../api/endpoints';
import ImageUpload from '../../../../shared/FormElements/ImageUpload';

type TableEditModeProps = {
  onUpdate: (user: User) => void;
  onErrorEmail: (err: string) => void;
  onErrorAge: (err: string) => void;
  onErrorPassword: (err: string) => void;
}

export const TableEditMode = (props: TableEditModeProps) => {
  const auth = useContext(AuthContext);
  const user = auth.user as User;

  const [isChange, setIsChange] = useState(false);
  const [{
    firstName,
    lastName,
    age,
    email,
    password,
    confirmPassword,
    imageUrl
  }, setState] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    age: user.age,
    email: user.email,
    password: user.password,
    confirmPassword: user.password,
    imageUrl: user.imageUrl
  });

  const [imageFile, setImage] = useState<any>();

  const handleFile = (file:any) => {
    setImage(file);
    !isChange && setIsChange(true);
  };

  const _onClickUpdate = async () => {
    const response = await uploadImage(imageFile);
    if (!response.isValid) {
      return;
    }

    props.onUpdate({
      ...user,
      first_name: firstName,
      last_name: lastName,
      age: age,
      email: email,
      password: password,
      imageUrl: response.imageUrl
    });
  };

  const isFormValid = () => {
    return (
      isChange &&
      firstName &&
      !validator.isEmpty(firstName) &&
      lastName &&
      !validator.isEmpty(lastName) &&
      password &&
      !validator.isEmpty(password) &&
      password === confirmPassword &&
      email &&
      validator.isEmail(email) &&
      age &&
      validator.isNumeric(String(age))) &&
      (Number(age) < 120 && Number(age) > 1);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    !isChange && setIsChange(true);
  };

  useEffect(() => {
    if (email && !validator.isEmail(email) && !validator.isEmpty(email)) {
      props.onErrorEmail('Please enter a valid email address');
    } else {
      props.onErrorEmail('');
    }
  }, [email, age]);

  useEffect(() => {
    if (age && !validator.isNumeric(String(age))) {
      props.onErrorAge('Age must be a number');
    } else if (Number(age) > 120 || Number(age) < 1) {
      props.onErrorAge('Age must be higher then 1 and less then 120');
    } else {
      props.onErrorAge('');
    }
  }, [age]);

  useEffect(() => {
    if (validator.isEmpty(password!) || password !== confirmPassword) {
      props.onErrorPassword('Passwords did not match');
    } else {
      props.onErrorPassword('');
    }
  }, [password, confirmPassword]);

  return (
    <tbody>
      <tr>
        <td>First Name</td>
        <td>
          <Input
            className="tableInput"
            type="text"
            name="firstName"
            value={firstName ?? ''}
            onChange={handleChange}
          />
        </td>
      </tr>
      <tr>
        <td>Last Name</td>
        <td>
          <Input
            className="tableInput"
            type="text"
            name="lastName"
            value={lastName ?? ''}
            onChange={handleChange}
          />
        </td>

      </tr>
      <tr>
        <td>Email Address</td>
        <td>
          <Input
            className="tableInput"
            type="email"
            name="email"
            value={email ?? ''}
            onChange={handleChange}
          />
        </td>
      </tr>
      <tr>
        <td>Password</td>
        <td>
          <Input
            className="tableInput"
            type="password"
            name="password"
            value={password ?? ''}
            onChange={handleChange}
          />
        </td>
      </tr>
      <tr>
        <td>Confirm Password</td>
        <td>
          <Input
            className="tableInput"
            type="password"
            name="confirmPassword"
            value={confirmPassword ?? ''}
            onChange={handleChange}
          />
        </td>
      </tr>
      <tr>
        <td>Age</td>
        <td>
          <input type="age"
            className="tableInput"
            placeholder="Enter age"
            name="age" value={age}
            onChange={handleChange} />
        </td>
      </tr>
      <br></br>
      <ImageUpload id="image" center={false} previewUrl={imageUrl} onInput={handleFile} />
      <br></br>
      <button
        type="submit"
        disabled={!isFormValid()}
        onClick={_onClickUpdate}
        className="btn btn-primary btn-block">
        Save
      </button>
    </tbody>
  );
};
