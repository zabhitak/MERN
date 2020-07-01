import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        Emaily!
      </h1>
      Collect feedback form your users
      <Link to='/surveys'>
            FEEDBACK
          </Link>
    </div>
  );
};

export default Landing;