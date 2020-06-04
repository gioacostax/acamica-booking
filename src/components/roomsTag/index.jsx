/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import { Hotel } from 'blink/icons/the-icon-of';

export default React.memo(function RoomsTag({ value }) {
  return (
    <div className="rooms-tag"><Hotel />{`${value} habitaciones`}</div>
  );
});
