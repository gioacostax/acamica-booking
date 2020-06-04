/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';

export default React.memo(function PriceRank({ value }) {
  return (
    <div className="price-rank">
      <span className={value > 0 ? 'filled' : ''}>$</span>
      <span className={value > 1 ? 'filled' : ''}>$</span>
      <span className={value > 2 ? 'filled' : ''}>$</span>
      <span className={value > 3 ? 'filled' : ''}>$</span>
    </div>
  );
});
