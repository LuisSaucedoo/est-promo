import { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { supervisores, rutasVuelos, cantidadPasajeros, rutasValores } from './constants/firebaseConstants';
import SelectComponent from './Components/SelectComponent';
import './styles/app.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [supervisor, setSupervisor] = useState('');
  const [rutaVuelo, setRutaVuelo] = useState('');
  const [cantidadPasajerosSeleccionados, setCantidadPasajeros] = useState('');
  const [selectedAerolinea, setSelectedAerolinea] = useState('');
  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [selectedMonto, setSelectedMonto] = useState('');
  const [codigoGenerado, setCodigoGenerado] = useState(''); // Estado para almacenar el código generado
  const [ttlValue, setTTLValue] = useState('');
  const canGenerateCode = supervisor && rutaVuelo && cantidadPasajerosSeleccionados;


  const handleTTLChange = (e) => {
    setTTLValue(e.target.value);
  };
  

  const handleRutaVueloChange = (selectedRoute) => {
    const { aerolinea, proveedor, monto } = rutasValores[selectedRoute];
    setSelectedAerolinea(aerolinea);
    setSelectedProveedor(proveedor);
    setSelectedMonto(monto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      supervisor &&
      rutaVuelo &&
      cantidadPasajerosSeleccionados &&
      selectedAerolinea &&
      selectedProveedor &&
      selectedMonto
    ) {
      if (ttlValue !== '') { // Verificar si el campo TTL no está vacío
        try {
          const codigoGenerado = generateCodigo(rutaVuelo, cantidadPasajerosSeleccionados); // Generar el código
          await addDoc(collection(db, 'promo-codes'), {
            supervisor,
            rutaVuelo,
            cantidadPasajeros: cantidadPasajerosSeleccionados,
            aerolinea: selectedAerolinea,
            proveedor: selectedProveedor,
            monto: selectedMonto,
            codigoGenerado: codigoGenerado,
            ttl: ttlValue,
          });
          toast.success('¡Mensaje enviado!', {
            position: toast.POSITION.TOP_RIGHT
          });
          setSupervisor('');
          setRutaVuelo('');
          setCantidadPasajeros('');
          setSelectedAerolinea('');
          setSelectedProveedor('');
          setSelectedMonto('');
          setCodigoGenerado('');
          setTTLValue('');
        } catch (error) {
          toast.error(`Error: ${error.message}`);
        }
      } else {
        toast.error('Por favor, ingrese un valor para TTL.');
      }
    } else {
      toast.error('Por favor, complete todas las selecciones.');
    }
  }

  const generateCodigo = (rutaVuelo, cantidadPasajeros) => {
    const rutaCode = rutaVuelo.split('--')[1].trim();
    const pasajerosCode = cantidadPasajeros.toString().padStart(2, '0');
    const codigo = `PC-${rutaCode}-${pasajerosCode}`;
    return codigo;
  };

  useEffect(() => {
    setCodigoGenerado(''); // Reiniciar el código generado al cambiar las selecciones
  }, [rutaVuelo, cantidadPasajerosSeleccionados]);

   // Función para verificar si todos los campos están seleccionados
   const areAllFieldsSelected = () => {
    return (
      supervisor &&
      rutaVuelo &&
      cantidadPasajerosSeleccionados &&
      selectedAerolinea
    );
  };

  return (
    <>
        <div className='card'>
          <form className='form' onSubmit={handleSubmit}>
            <h1>Outlet</h1>

            <SelectComponent
              label="Supervisor"
              options={supervisores}
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              hasValue={supervisor !==''}
            />

            <SelectComponent
              label="Ruta"
              options={rutasVuelos}
              value={rutaVuelo}
              onChange={(e) => {
                setRutaVuelo(e.target.value);
                handleRutaVueloChange(e.target.value);
              }}

              hasValue={rutaVuelo !== ''}
            />

            <div className="selected-values-box">
              {selectedAerolinea && selectedProveedor && selectedMonto && (
                <div className="selected-value">
                  <span className="selected-label">Aerolínea:</span>
                  <span className="selected-info">{selectedAerolinea}</span>
                </div>
              )}
              {selectedProveedor && (
                <div className="selected-value">
                  <span className="selected-label">Proveedor:</span>
                  <span className="selected-info">{selectedProveedor}</span>
                </div>
              )}
              {selectedMonto && (
                <div className="selected-value">
                  <span className="selected-label">Tarifa:</span>
                  <span className="selected-info">{selectedMonto}</span>
                </div>
              )}
            </div>
            <SelectComponent
              label="Cantidad de Pasajeros"
              options={cantidadPasajeros}
              value={cantidadPasajerosSeleccionados}
              onChange={(e) => setCantidadPasajeros(e.target.value)}
              hasValue={cantidadPasajerosSeleccionados !== ''}
            />

            <button
              className='generate-button'
              onClick={(e) => {
                e.preventDefault();
                if (canGenerateCode) {
                  const codigoGenerado = generateCodigo(rutaVuelo, cantidadPasajerosSeleccionados);
                  setCodigoGenerado(codigoGenerado);
                }   
              }}
              disabled={!canGenerateCode}
            >
              GENERAR CÓDIGO
            </button>

            {codigoGenerado !== '' && (
              <>
                <p className='codigo-generado'>{codigoGenerado}</p>
                <div className='ttl-input-box'>
                  <label>TTL:</label>
                  <input
                    type='text'
                    value={ttlValue}
                    onChange={handleTTLChange}
                    placeholder='Introduce el valor TTL'
                  />
                </div>
              </>
            )}

            <button
              type='submit'
              className='button'
              disabled={!areAllFieldsSelected()} // Deshabilitar el botón si no todos los campos están seleccionados
            >
            Enviar
            </button>
          </form>
          <ToastContainer />
        </div>
    </>
  );
}

export default App;