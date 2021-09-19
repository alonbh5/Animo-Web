import React from 'react';

export function Team (props: any) {
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title' style={{ marginBottom: '10px' }}>
          <h2>Meet the Team</h2>
        </div>
        <div id='row'>
          {props.data
            ? props.data.map((d: any, i: any) => (
              <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6 team'>
                <div className='thumbnail'>
                  <img src={d.img} alt='...' className='team-img' />
                  <div className='caption'>
                    <h4>{d.name}</h4>
                    <p>{d.content[0]}</p>
                    <p>{d.content[1]}</p>
                    <p>{d.content[2]}</p>
                  </div>
                </div>
              </div>
            ))
            : 'loading'}
        </div>
      </div>
    </div>
  );
};
