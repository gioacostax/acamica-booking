/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { Card } from 'src/components';

export default function ListCards({ cards = [] }) {
  return (
    <div className="list-cards">
      {
        cards.map((item) => <Card key={item.slug} info={item} />)
      }
    </div>
  );
}
