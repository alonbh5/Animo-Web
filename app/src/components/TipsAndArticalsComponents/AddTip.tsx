/* eslint-disable */

import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import validator from "validator";
import Input from "../../shared/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { Tip } from "../api/configuration/models/tip";


const initialState = {
  title: "",
  author: "",
  content: ""
};
export const AddTip = () => {
  const [{ title, author, content }, setState] = useState(initialState);
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();
  //const { rolesOptions } = useRoles();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormValid = () => {
    return (
      !validator.isEmpty(title) &&
      !validator.isEmpty(content) 
      // !(validator.isEmpty(url) || validator.isEmpty(content)) //TODO
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const tipToAddToDB: Tip = {
      title,
      author,
      content
    };

    const params: AxiosRequestConfig = {
      method: "POST",
      url: "/phydata",
      data: {
        ...tipToAddToDB,
        data_type: "Tip",
        confirm: "false",
      },
    };
    try {
      const response = await sendRequest(params);
    } catch (err) {}
  };
  
  return (
        <div className="col-md-8 col-md-offset-2 section-title">
        <br></br>
          <h5>Add Tip</h5>
          <form onSubmit={handleSubmit}>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="form-group">
              <Input
                className="form-control"
                required={true}
                type="text"
                name="title"
                label="Tip title"
                placeholder="Enter tip title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                required={false}
                type="text"
                name="author"
                label="Tip author"
                placeholder="Enter tip author"
                value={author}
                onChange={handleChange}
              />
            </div>
              
            <div className="form-group">
              <textarea
                style={{height: "100px"}}
                className="form-control"
                required={false}
                name="content"
                placeholder="Place your tip here "
                value={content}
                onChange={handleChange}
              />
            </div>
            <button
                type="submit"
                disabled={!isFormValid()}
                className="btn btn-primary btn-block">
                  Upload
              </button>
          </form>
        </div>
  );
};
