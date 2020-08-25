import * as React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Devolver = ({producto, devolver}) => {

    return(
        <button onClick={() => devolver(producto)}><ArrowForwardIcon color= 'primary'/></button>
    )
}

export default Devolver;