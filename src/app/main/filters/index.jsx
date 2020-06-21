/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

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
      <TextField
        type="date"
        value={fromDate}
        onChange={onFilterChange}
        name="fromDate"
      />
      <TextField
        type="date"
        value={toDate}
        onChange={onFilterChange}
        name="toDate"
      />
      <Select native value={country} onChange={onFilterChange} name="country" className="Select country">
        <option value="-">Todos los países</option>
        <option value="Argentina">Argentina</option>
        <option value="Brasil">Brasil</option>
        <option value="Chile">Chile</option>
        <option value="Uruguay">Uruguay</option>
      </Select>
      <Select native value={price} onChange={onFilterChange} name="price" className="Select price">
        <option value="0">Cualquier precio</option>
        <option value="1">Precio $</option>
        <option value="2">Precio $$</option>
        <option value="3">Precio $$$</option>
        <option value="4">Precio $$$$</option>
      </Select>
      <Select native value={size} onChange={onFilterChange} name="size" className="Select size">
        <option value="0">Cualquier tamaño</option>
        <option value="1">Hotel pequeño</option>
        <option value="2">Hotel mediano</option>
        <option value="3">Hotel grande</option>
      </Select>
    </div>
  );
}
