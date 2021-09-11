
import React from 'react';

type PageLayoutProps = {
    title: string;
    children: any;
    cols?:boolean;
    classname?:string;
}

const PageLayout = (props:PageLayoutProps) => {
  return (
    <div id={props.classname ? undefined : 'team'} className={props.classname || 'text-center'}>
      <div className="container">
        <div className={props.cols ? 'col-md-8 col-md-offset-2 section-title' : 'section-title'}>
          <h2>{props.title}</h2>
          {props.children}
        </div>
      </div>
    </div>);
};
export default PageLayout;
