import { useContext, useEffect, useState } from "react";
import { AxiosRequestConfig } from 'axios';
import { AuthContext } from "../shared/context/auth-context"
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import {RoleEnum} from "./api/configuration/models/role";


export const Profile = (props: any) => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string>("");
  const [role, setRole] = useState<keyof RoleEnum>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const params: AxiosRequestConfig = {
          method: 'GET',
          url: `/users/getuser/${auth.userId}`,
          headers: {
            Authorization: 'Bearer ' + auth.token
          }
        }
        const response = await sendRequest(params);
        //TODO : REFACTOR
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setAge(response.data.age);
        setGender(response.data.gender);
      } catch (err) { }
    }
    fetchUser();
  }, [])
//TODO: change from roleid to role
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Profile</h2>
          {isLoading && <LoadingSpinner asOverlay />}
          <p>First Name: {first_name}</p>
          <p>Last Name: {last_name}</p>
          <p>Email Address: {email}</p>
          <p>Age: {age}</p>
          <p>Gender: {gender}</p>
          <p>Role ID: {role}</p> 
        </div>
      </div>
    </div>
  );
}