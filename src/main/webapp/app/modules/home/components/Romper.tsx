import * as React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Romper = ({producto, romper}) => {

    return(
        <button onClick={() => romper(producto)}><ArrowForwardIcon color= 'primary'/></button>
    )
}

export default Romper;