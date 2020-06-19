/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React, { useEffect, useState } from 'react';
import { format } from 'fecha';
import hotelsData from './data.js';
import Header from './header';
import Filters from './filters';
import ListCards from './listCards';

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

export default function Main() {
  const [list, setList] = useState(hotelsData);
  const [filter, setFilter] = useState({
    // Por defecto la fecha de inicio con formato 'YYYY-MM-DD'
    fromDate: format(Date.now(), 'isoDate'),
    // Por defecto la fecha de finalización termina 10 días después con formato 'YYYY-MM-DD'
    toDate: format(new Date(Date.now().valueOf() + 864000000), 'isoDate'),
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
          new Date(format(new Date(item.availabilityFrom), 'YYYY[/]MM[/]DD')).valueOf(),
          new Date(filter.fromDate.replace(/-/gi, '/')).valueOf(),
          new Date(format(new Date(item.availabilityTo), 'YYYY[/]MM[/]DD')).valueOf(),
          new Date(filter.toDate.replace(/-/gi, '/')).valueOf()
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
    if ((e.target.type === 'date') && value === '') value = format(new Date(), 'isoDate');

    // Actualizamos estado de filtros
    setFilter({
      ...filter,
      [e.target.name]: value
    });
  };

  return (
    <div id="main">
      <Header fromDate={filter.fromDate} toDate={filter.toDate} />
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
