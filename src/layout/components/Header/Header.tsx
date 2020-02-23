import React, { FunctionComponent } from 'react';
import { observer } from '../../../common/util';
import './Header.scss';


const Header: FunctionComponent = () => {
  return (
    <header className='header'>
      this is a Header
    </header>
  );
};


observer(Header)

export default Header;
