/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';
import { Card } from 'src/components';

export default function ListCards({ cards = [] }) {
  return (
    <div id="list">
      {
        cards.length > 0
          ? cards.map((item) => <Card key={item.slug} info={item} />)
          : <div className="empty-list">No hay hoteles disponibles</div>
      }
    </div>
  );
}
