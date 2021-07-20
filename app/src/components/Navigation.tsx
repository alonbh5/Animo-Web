
export const Navigation = (props:any) => {
    return (
      <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='#bs-example-navbar-collapse-1'
            >
              {' '}
              <span className='sr-only'>Toggle navigation</span>{' '}
              <span className='icon-bar'></span>{' '}
              <span className='icon-bar'></span>{' '}
              <span className='icon-bar'></span>{' '}
            </button>
            <a className='navbar-brand page-scroll' href='#page-top'>
              Animo
            </a>{' '}
          </div>
  
          <div
            className='collapse navbar-collapse'
            id='bs-example-navbar-collapse-1'
          >
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <a href='/welcome#services' className='page-scroll'>
                  Analyze Amotional
                </a>
              </li>
              <li>
                <a href='/welcome#portfolio' className='page-scroll'>
                  Tips & article
                </a>
              </li>
              <li>
                <a href='/welcome#testimonials' className='page-scroll'>
                  sos
                </a>
              </li>
              <li>
                <a href='/welcome#about' className='page-scroll'>
                  about
                </a>
              </li>
              <li>
                <a href='/welcome#contact' className='page-scroll'>
                  Contact
                </a>
              </li>
              <li>
                <a href='/signin' className='page-scroll'>
                  signin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }