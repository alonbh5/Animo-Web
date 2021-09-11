
import React from 'react';

type PageLayoutProps = {
    title: string;
    children: any;
    classname?:string;
}

const PageLayout = (props:PageLayoutProps) => {
  return (
    <div id={props.classname ? undefined : 'page'} className={props.classname || 'text-center'}>
      <div className="container">
        <div className="section-title">
          <h2>{props.title}</h2>
          {props.children}
        </div>
      </div>
    </div>);
};
export default PageLayout;
