/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { useEffect, useState } from 'react';
import { ListCards, Filters } from 'src/components';
import hotelsData from './data.js';

// Función que convierte número de cuartos a un rango de tamaños de 1, 2 o 3
const getSize = (size) => {
  if (size <= 10) return 1;
  if (size > 10 && size <= 20) return 2;
  if (size > 20) return 3;
  return 0;
};

// Función que valida si un rango de fechas se encuentra dentro de otro rango de fechas
const validDate = (availabilityFrom, from, availabilityTo, to) => {
  if (
    to >= from
    && from >= availabilityFrom
    && from <= availabilityTo
    && to >= availabilityFrom
    && to <= availabilityTo
  ) return true;
  return false;
};

// Función que retorna el formato de fecha en un lenguaje familiar
const formatDate = (dateISO) => {
  const date = new Date(`${dateISO} GMT-${new Date().getTimezoneOffset() / 60}`);
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];

  return `${day}, ${date.getDate()} de ${month} de ${date.getFullYear()}`;
};

export default function Main() {
  const dateNow = new Date();
  const [list, setList] = useState(hotelsData);
  const [filter, setFilter] = useState({
    // Por defecto la fecha de inicio con formato 'YYYY-MM-DD'
    fromDate: `${dateNow.getFullYear()}-${`0${dateNow.getMonth() + 1}`.slice(-2)}-${`0${dateNow.getDate()}`.slice(-2)}`,
    // Por defecto la fecha de finalización termina 10 días después con formato 'YYYY-MM-DD'
    toDate: `${dateNow.getFullYear()}-${`0${dateNow.getMonth() + 1}`.slice(-2)}-${`0${dateNow.getDate() + 10}`.slice(-2)}`,
    country: '-',
    price: 0,
    size: 0
  });

  // Actualizamos lista de resultados cada vez que haya un cambio en el filtro
  useEffect(() => {
    // eslint-disable-next-line arrow-body-style
    const newList = hotelsData.filter((item) => {
      return (
        // Filtramos por rango de fecha
        validDate(
          item.availabilityFrom,
          new Date(filter.fromDate).valueOf(),
          item.availabilityTo,
          new Date(filter.toDate).valueOf()
        )
        // Filtramos por pais ('-' es igual a todos los paises)
        && ((item.country === filter.country) || filter.country === '-')
        // Filtramos por precio (0 es igual a cualquier precio)
        && ((item.price === filter.price) || filter.price === 0)
        // Filtramos por tamaño (0 es igual a cualquier tamaño)
        && ((getSize(item.rooms) === filter.size) || filter.size === 0)
      );
    });

    // Actualizamos estado de lista
    setList(newList);
  }, [filter]);

  // Maneja cada cambio de filtro a través de la etiqueta 'name'
  const handleFilter = (e) => {
    let { value } = e.target;
    // Si la etiqueta corresponde a 'price' o 'size' convertimos a entero su valor
    if (e.target.name === 'price' || e.target.name === 'size') value = parseInt(value, 10);
    // eslint-disable-next-line prefer-destructuring
    if ((e.target.type === 'date') && value === '') value = new Date().toISOString().split('T')[0];

    // Actualizamos estado de filtros
    setFilter({
      ...filter,
      [e.target.name]: value
    });
  };

  return (
    <div id="main">
      <h1>Hoteles</h1>
      <p>desde el {formatDate(filter.fromDate)} hasta el {formatDate(filter.toDate)}</p>
      <Filters
        onFilterChange={handleFilter}
        fromDate={filter.fromDate}
        toDate={filter.toDate}
        country={filter.country}
        price={filter.price}
        size={filter.size}
      />
      <ListCards cards={list} />
    </div>
  );
}
