import * as React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const Encargar = ({producto, encargar}) => {

    return(
        <button onClick={() => encargar(producto)}><ArrowBackIcon color= 'primary'/></button>
    )
}

export default Encargar;