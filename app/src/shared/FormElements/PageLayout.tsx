
import React from 'react';
type PageLayoutProps = {
    title: string;
    children: any
}

const PageLayout = (props:PageLayoutProps) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>{props.title}</h2>
          {props.children}
        </div>
      </div>
    </div>);
};
export default PageLayout;
