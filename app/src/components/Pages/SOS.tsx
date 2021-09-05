import React from 'react';
import IdentityTable from './Sos/IdentityTable';

const SOS = (props: any) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>SOS</h2>
          <div><IdentityTable /></div>
        </div>
      </div>
    </div>
  );
};

export default SOS;
