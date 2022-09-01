import React, { Component } from 'react'
import Header from '../../components/Head';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IdFactura from '../../components/facturacion/Factura';


export const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
});

export default class PayFact extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      factura: null,
      pago: null,
      Open: false,
      txtTarjeta : '',
      txtCBU : ''
    };

    this.handleChangeFactura = this.handleChangeFactura.bind(this);
    this.handleChangePago = this.handleChangePago.bind(this);
    this.handleChangetxtTarjeta = this.handleChangetxtTarjeta.bind(this);
    this.handleChangetxtCBU = this.handleChangetxtCBU.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.setState({ Open: false });
  };
  handleToggle = () => {
    this.setState({ Open: !this.Open });
  };

  handleChangeFactura(event) {
    this.setState({ factura: event.target.value });
  }
  handleChangePago(event) {
    this.setState({ pago: event.target.value })
  }
  handleChangetxtTarjeta(event) {
    this.setState({ txtTarjeta: event.target.value })
  }
  handleChangetxtCBU(event) {
    this.setState({ txtCBU: event.target.value })
  }

  handleSubmit(event) {
    alert('tu factura es: ' + this.state.factura);
    alert('tu metodo de pago es: ' + this.state.pago)
    event.preventDefault();
  }
  

  render() {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

        <Header category="Facturas" title="Pagar factura" />

        <form onSubmit={this.handleSubmit} className="my-4 grid grid-cols-5 items-center gap-5">
          <IdFactura value={this.state.factura} click={this.handleChangeFactura}/>
          {/* <>
            <label>
              Seleccione la factura a pagar:
            </label>
            <select
              value={this.state.factura}
              onChange={this.handleChangeFactura}
              className="bg-gray-100 p-4 mx-3 rounded-lg col-span-4"
            >
              <option value="null">Seleccione una factura</option>
               {this.props.map((item)=>(
                <option value={item.idfactura}>{item.idfactura}</option>
              ))} 
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </> */}
          {/* estos campos se van a rellenar solos cuando se seleccione el id de la factura */}
          <>
            <label>
              Proveedor:
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder='Proveedor'
              readOnly
              vali
              className='bg-gray-100 p-4 mx-3 rounded-lg col-span-4' />
          </>
          <>
            <label>
              Banco Seleccionado:
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder='Banco'
              readOnly
              className='bg-gray-100 p-4 mx-3 rounded-lg col-span-4' />
          </>
          {/*  */}
          <>
            <label>
              Seleccione el metodo de pago:
            </label>
            <select
              value={this.state.pago}
              onChange={this.handleChangePago}
              className="bg-gray-100 p-4 mx-3 rounded-lg col-span-4"
            >
              <option value="null">Seleccione un metodo de pago</option>
              <option value="tarjeta de credito/debito">tarjeta de credito/debito</option>
              <option value="transferencia Bancaria">transferencia Bancaria</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </>
          {
            this.state.pago === "tarjeta de credito/debito"
              ?
              <>
                <label>
                  Ingrese numero de tarjeta:
                </label>
                <input
                  type="text"
                  name="txtTarjeta"
                  id="txtTarjeta"
                  maxLength={16}
                  placeholder="Numero de tarjeta"
                  required
                  value={this.state.txtTarjeta}
                  onChange={this.handleChangetxtTarjeta}
                  className='bg-gray-100 p-4 mx-3 rounded-lg col-span-4' />
              </>
              :
              <></>
          }
          <>
            <label>
              Importe total:
            </label>
            <input
              type="number"
              name=""
              id=""
              maxLength={22}
              placeholder="Importe"
              readOnly
              className='bg-gray-100 p-4 mx-3 rounded-lg col-span-4' />
          </>
          <>
            <label>
              Ingrese el CBU:
            </label>
            <input
              type="number"
              name="txtCBU"
              id='txtCBU'
              maxLength={22}
              placeholder="CBU"
              required
              value={this.state.txtCBU}
              onChange={this.handleChangetxtCBU}
              className='bg-gray-100 p-4 mx-3 rounded-lg col-span-4' />
          </>

          <input type="submit" value="Submit" className="rounded-lg bg-green-500 font-bold p-3 col-start-4 mx-3 mt-10 cursor-pointer" onClick={this.handleToggle} />

          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={this.state.Open}
            onClick={this.handleClose}
            transitionDuration={1000}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Snackbar open={this.state.Open} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical: 'botton', horizontal: 'left' }}>
            {
              ((this.state.factura !== null && this.state.pago !== null) && (this.state.txtTarjeta !== '' || (this.state.pago === 'tarjeta de credito/debito' && this.state.txtCBU !== ''))) 
                ?
                <Alert onClose={this.handleClose} sx={{ width: '100%' }} severity="success">Transaccion realizada con exito!</Alert>
                :
                <Alert onClose={this.handleClose} sx={{ width: '100%' }} severity="error">Error al cargar los datos</Alert>
            }
          </Snackbar>

        </form>
      </div>
    );
  }
}

