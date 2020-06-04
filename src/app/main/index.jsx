/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { Card } from 'src/components';
import hotelsData from '../../static/scripts/data.js';

export default function Main() {
  return (
    <div id="main">
      {
        hotelsData.map((item) => <Card key={item.slug} info={item} />)
      }
    </div>
  );
}
