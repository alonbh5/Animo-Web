import React, { useEffect, useState } from 'react';
import 'react-simple-hook-modal/dist/styles.css';
import { useRoles } from '../../shared/hooks/roles-hook';

import validator from 'validator';
import Input from '../../shared/FormElements/Input';
import { User } from '../api/configuration/models/users';
import { Role } from '../api/configuration/models/role';

import {
  Modal,
  ModalTransition
} from 'react-simple-hook-modal';
type EditUserModalProps = {
 user: User;
 onUpdate:(user: User) => void;
 isOpen: boolean;
 closeModal: () => void;

}
export const EditUserModal = (props: EditUserModalProps) => {
  const { user } = props;
  const { rolesOptions } = useRoles();

  const [isChange, setIsChange] = useState(false);
  const [{
    firstName,
    lastName,
    age,
    email,
    gender,
    role
  }, setState] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    age: user.age,
    email: user.email,
    gender: user.gender,
    role: user.role_id
  });

  const _onClickUpdate = () => {
    console.log(user);
    props.onUpdate({
      ...user,
      first_name: firstName,
      last_name: lastName,
      age: age,
      email: email,
      role_id: role,
      gender: gender
    });
    props.closeModal();
  };

  const isFormValid = () => {
    return (
      isChange &&
      firstName &&
      !validator.isEmpty(firstName) &&
      lastName &&
      !validator.isEmpty(lastName) &&
      email &&
      validator.isEmail(email) &&
      age &&
      validator.isNumeric(String(age))) &&
      (Number(age) < 120 && Number(age) > 1);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name + value);
    setState((prevState) => ({ ...prevState, [name]: value }));
    !isChange && setIsChange(true);
  };

  useEffect(() => {
    if (email && !validator.isEmail(email) && !validator.isEmpty(email)) {
    //   props.onErrorEmail('Please enter a valid email address');
    } else {
    //   props.onErrorEmail('');
    }
  }, [email, age]);

  useEffect(() => {
    if (age && !validator.isNumeric(String(age))) {
    //   props.onErrorAge('Age must be a number');
    } else if (Number(age) > 120 || Number(age) < 1) {
    //   props.onErrorAge('Age must be higher then 1 and less then 120');
    } else {
    //   props.onErrorAge('');
    }
  }, [age]);
  const _onClose = () => {
    setIsChange(false);
    setState({
      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      email: user.email,
      gender: user.gender,
      role: user.role_id
    });
    props.closeModal();
  };
  return (
    <>
      <Modal
        id="any-unique-identifier"
        isOpen={props.isOpen}
        transition={ModalTransition.BOTTOM_UP}
      >
        <div className='container-update'>
          <div className='header'>   <h2>Update User Settings</h2 ></div>
          <div className='table-edit'>
            <table>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>
                    <Input
                      className="form-control"
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
                      className="form-control"
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
                      className="form-control"
                      type="email"
                      name="email"
                      value={email ?? ''}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>
                    <input type="age"
                      className="form-control"
                      placeholder="Enter age"
                      name="age" value={age}
                      onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>
                    <select
                      value={gender}
                      onChange={handleChange}
                      name="gender"
                      className="form-control"
                    >
                      <option value="" disabled selected>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select></td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>
                    <select
                      value={role}
                      onChange={handleChange}
                      name="role"
                      className="form-control">
                      <option value="" disabled selected>Select Role</option>
                      {rolesOptions?.map((role: Role, index:number) =>
                        <option key={role.role_id} value={`${role.role_id}`}>
                          {role.role_type}
                        </option>
                      )}
                    </select></td>
                </tr>
                <br></br>
                <tr>
                  <td>       <button
                    type="submit"
                    disabled={!isFormValid()}
                    onClick={_onClickUpdate}
                    className="btn btn-primary btn-block">
        Save
                  </button></td>
                  <td>        <button
                    type="reset"
                    onClick={_onClose}
                    className="btn btn-primary btn-block">
        close
                  </button></td>

                </tr>
              </tbody>
            </table></div></div>
      </Modal>
    </>
  );
};
