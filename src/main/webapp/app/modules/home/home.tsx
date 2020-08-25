import './home.scss';

import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import Encargar from './components/Encargar';
import Devolver from './components/Devolver';
import Romper from './components/Romper';
import Arreglar from './components/Arreglar';

import { IRootState } from 'app/shared/reducers';
export type IHomeProp = StateProps;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 800,

  },
});

export const Home = (props: IHomeProp) => {
  const { account } = props;
  const classes = useStyles();

  const [productos, setProductos] = useState([{
    "availableToSellQuantity": 0,
    "brokenQuantity": 0,
    "id": 0,
    "inChargeQuantity": 0,
    "product": {
      "id": 0,
      "name": "string"
    }
  }])

  useEffect(() => {


    const obtenerProductos = async () => {
      const url = 'http://localhost:8080/api/product-buckets';
      const ventas = await Axios.get(url);
      const resultados = ventas;

      setProductos(resultados.data);
      // eslint-disable-next-line no-console
      console.log(productos);
    }


    obtenerProductos();


  }, [])

  const encargar = disponible => {
    const aux = disponible;
    if (aux.inChargeQuantity < 3 && aux.availableToSellQuantity > 0) {
      aux.inChargeQuantity = aux.inChargeQuantity + 1;
      aux.availableToSellQuantity = aux.availableToSellQuantity - 1;
    }
    setProductos([
      ...productos
    ])
  }

  const devolver = devuelto => {
    const aux = devuelto;
    if (aux.availableToSellQuantity < 10 && aux.inChargeQuantity > 0) {
      aux.availableToSellQuantity = aux.availableToSellQuantity + 1;
      aux.inChargeQuantity = aux.inChargeQuantity - 1;
    }
    setProductos([
      ...productos
    ])
  }

  const romper = roto => {
    const aux = roto;
    if (aux.brokenQuantity < 2 && aux.availableToSellQuantity > 0) {
      aux.brokenQuantity = aux.brokenQuantity + 1;
      aux.availableToSellQuantity = aux.availableToSellQuantity - 1;
    }
    setProductos([
      ...productos
    ])
  }

  const arreglar = arreglado => {
    const aux = arreglado;
    if (aux.availableToSellQuantity < 10 && aux.brokenQuantity > 0) {
      aux.availableToSellQuantity = aux.availableToSellQuantity + 1;
      aux.brokenQuantity = aux.brokenQuantity - 1;
    }
    setProductos([
      ...productos
    ])
  }


  return (



    <Fragment>

      <h1>Control de Stock</h1>

      <TableContainer >
        <Table className={classes.table} aria-label="simple table" >
          <TableHead>
            <TableRow>
              <TableCell align="right" >NRO</TableCell>
              <TableCell align="right" >PRODUCTO</TableCell>
              <TableCell align="right" >ENCARGADOS</TableCell>
              <TableCell align="right" >MOVER</TableCell>
              <TableCell align="right" >DISPONIBLES</TableCell>
              <TableCell align="right" >MOVER</TableCell>
              <TableCell align="right" >ROTOS</TableCell>

            </TableRow>
          </TableHead>

          <TableBody> {productos.map(producto => (

            <TableRow key={producto.id}>
              <TableCell align="right" >{producto.id}</TableCell>
              <TableCell align="right" >{producto.product.name}</TableCell>
              <TableCell align="right" >{producto.inChargeQuantity}</TableCell>
              <TableCell align="right" ><Encargar encargar={encargar} producto={producto} /><Devolver devolver={devolver} producto={producto} /></TableCell>
              <TableCell align="right" >{producto.availableToSellQuantity}</TableCell>
              <TableCell align="right" ><Arreglar arreglar={arreglar} producto={producto} /><Romper romper={romper} producto={producto} /></TableCell>
              <TableCell align="right" >{producto.brokenQuantity}</TableCell>
            </TableRow>

          ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Fragment>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
