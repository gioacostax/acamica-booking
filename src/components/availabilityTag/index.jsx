/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';

export default function AvailabilityTag({ from, to }) {
  return (
    <div className="availability-tag">
      <h3>Disponibilidad</h3>
      <p className="dates">{new Date(from).toLocaleDateString()} al {new Date(to).toLocaleDateString()}</p>
    </div>
  );
}
