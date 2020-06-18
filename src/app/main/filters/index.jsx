/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';

export default function Filters({
  onFilterChange = () => {},
  fromDate = new Date().valueOf(),
  toDate = new Date().valueOf(),
  country = 'Todos',
  price = 0,
  size = 0
}) {
  return (
    <div id="filters">
      <input value={fromDate} onChange={onFilterChange} name="fromDate" type="date" className="textfield date" />
      <input value={toDate} onChange={onFilterChange} name="toDate" type="date" className="textfield date" />
      <select value={country} onChange={onFilterChange} name="country" className="select country">
        <option value="-">Todos los países</option>
        <option value="Argentina">Argentina</option>
        <option value="Brasil">Brasil</option>
        <option value="Chile">Chile</option>
        <option value="Uruguay">Uruguay</option>
      </select>
      <select value={price} onChange={onFilterChange} name="price" className="select price">
        <option value="0">Cualquier precio</option>
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
      </select>
      <select value={size} onChange={onFilterChange} name="size" className="select size">
        <option value="0">Cualquier tamaño</option>
        <option value="1">Hotel pequeño</option>
        <option value="2">Hotel mediano</option>
        <option value="3">Hotel grande</option>
      </select>
    </div>
  );
}
