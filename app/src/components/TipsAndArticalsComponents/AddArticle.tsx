/* eslint-disable */

import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import validator from "validator";
import Input from "../../shared/FormElements/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { Article } from "../api/configuration/models/article";
import { ArticleComponent } from "../TipsAndArticalsComponents/Articles";
import { TipComponent } from "../TipsAndArticalsComponents/Tips";

const initialState = {
  url: "",
  title: "",
  img: "",
  author: "",
  content: ""
};
export const AddArticle = () => {
  const [{ url, title, img, author, content }, setState] = useState(initialState);
  const { isLoading, error, sendRequest, clearMessages } = useHttpClient();
  //const { rolesOptions } = useRoles();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormValid = () => {
    return (
      !validator.isEmpty(title) &&
      !validator.isEmpty(author) 
      // !(validator.isEmpty(url) || validator.isEmpty(content)) //TODO
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const articleToAddToDB: Article = {
      url,
      title,
      img,
      author,
      content
    };

    const params: AxiosRequestConfig = {
      method: "POST",
      url: "/phydata",
      data: {
        ...articleToAddToDB,
        data_type: "Article",
      },
    };
    try {
      const response = await sendRequest(params);
    } catch (err) {}
  };
  
  return (
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Add article</h2>
          <form onSubmit={handleSubmit}>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="form-group">
              <Input
                className="form-control"
                required={false}
                type="text"
                name="url"
                label="Article link"
                placeholder="Enter the article url"
                value={url}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                required={true}
                type="text"
                name="title"
                label="Article title"
                placeholder="Enter article title"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                required={true}
                type="text"
                name="author"
                label="Article author"
                placeholder="Enter article author"
                value={author}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                required={false}
                type="text"
                name="img"
                label="Article image"
                placeholder="An image that describe the article, jpg file "
                value={img}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                style={{height: "100px"}}
                className="form-control"
                required={false}
                name="content"
                placeholder="Place your article here "
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
