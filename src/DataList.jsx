import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './styles/dataList.css'

const DataList = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'promo-codes'));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setFormData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='data-list'>
      <h1>Data from Firebase</h1>
      <ul>
        {formData.map((entry, index) => (
          <li key={index}>
            <strong>Supervisor:</strong> {entry.supervisor}<br />
            <strong>Ruta Vuelo:</strong> {entry.rutaVuelo}<br />
            <strong>Cantidad de Pasajeros:</strong> {entry.cantidadPasajeros}<br />
            <strong>Aerolínea:</strong> {entry.aerolinea}<br />
            <strong>Proveedor:</strong> {entry.proveedor}<br />
            <strong>Monto:</strong> {entry.monto}<br />
            <strong>Código Generado:</strong> <label className='codigo-generado'>{entry.codigoGenerado || 'N/A'}</label> <br />
            <strong>TTL:</strong>{entry.ttl}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;