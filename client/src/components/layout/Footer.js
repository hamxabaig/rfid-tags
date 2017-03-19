/**
 * Created by uzysjung on 2016. 10. 20..
 * Presentational Footer Component
 */

import React from 'react'
import Pkg from '../../../../package.json'
import Radium from 'radium'
const style = {
    background: '#fff',
    padding: '15px',
    color: '#444',
    borderTop: '1px solid #d2d6de'
};

const Footer = function() {
    return (
        <footer style={style}>
            <div className="pull-right hidden-xs">
                <b>Version</b> 1.0B
            </div>
            <strong>
                <span>Copyright &copy; 2017 </span>
                    Something to write here
            </strong>
        </footer>
    );
};

export default Radium(Footer);
