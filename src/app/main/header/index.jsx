/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';
import { format } from 'fecha';

// Función que retorna el formato de fecha en un lenguaje familiar
const formatDate = (dateISO) => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return format(new Date(dateISO), 'dddd[,] DD [de] MMMM [de] YYYY', {
    monthNames: months,
    dayNames: days
  });
};

export default function Header({ fromDate, toDate }) {
  return (
    <div id="header">
      <h1>Hoteles</h1>
      <p>desde el {formatDate(fromDate)} hasta el {formatDate(toDate)}</p>
    </div>
  );
}
