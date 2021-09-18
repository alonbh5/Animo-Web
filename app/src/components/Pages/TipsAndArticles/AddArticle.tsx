import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import validator from 'validator';
import Input from '../../../shared/FormElements/Input';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import Status from '../../../shared/UIElements/Status';
import { Article } from '../../api/configuration/models/article';

const initialState = {
  link: '',
  title: '',
  img: '',
  author: '',
  content: ''
};

export const AddArticle = () => {
  const [{ link, title, img, author, content }, setState] = useState(initialState);
  const { isLoading, error, success, sendRequest, clearMessages } = useHttpClient();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormValid = () => {
    return (
      !validator.isEmpty(title) &&
      !validator.isEmpty(author) &&
      (!validator.isEmpty(link) || !validator.isEmpty(content))
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    clearMessages();
    const articleToAddToDB: Article = {
      link,
      title,
      img,
      author,
      content
    };

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: '/phydata',
      data: {
        ...articleToAddToDB,
        data_type: 'Article',
        confirm: 'false'
      }
    };
    try {
      await sendRequest(params);
    } catch (err) {}
  };

  return (
    <div className="col-md-8 col-md-offset-2 section-title">
      <br></br>
      <h5>Add article</h5>
      <form onSubmit={handleSubmit}>
        <Status isLoading={isLoading} error={error} success={success}/>
        <div className="form-group">
          <Input
            className="form-control"
            required={false}
            type="text"
            name="link"
            label="Article link"
            placeholder="Enter the article link"
            value={link}
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
