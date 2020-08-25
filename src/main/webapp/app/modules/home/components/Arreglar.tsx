import * as React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Arreglar = ({producto, arreglar}) => {

    return(
        <button onClick={() => arreglar(producto)}><ArrowBackIcon color= 'primary'/></button>
    )
}

export default Arreglar;