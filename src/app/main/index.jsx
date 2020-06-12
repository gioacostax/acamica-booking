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

export default function Main() {
  const [list, setList] = useState(hotelsData);
  const [filter, setFilter] = useState({
    // Por defecto la fecha de inicio comienza el día de mañana con formato 'AAAA-MM-DD'
    fromDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    // Por defecto la fecha de finalización termina 5 días después con formato 'AAAA-MM-DD'
    toDate: new Date(Date.now() + 432000000).toISOString().split('T')[0],
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

    // Actualizamos estado de filtros
    setFilter({
      ...filter,
      [e.target.name]: value
    });
  };

  return (
    <div id="main">
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
