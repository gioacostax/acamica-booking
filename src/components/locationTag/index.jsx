/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './styles';
import React from 'react';

const flags = [
  { name: 'Argentina', emoji: '🇦🇷' },
  { name: 'Brasil', emoji: '🇧🇷' },
  { name: 'Chile', emoji: '🇨🇱' },
  { name: 'Uruguay', emoji: '🇺🇾' }
];

export default React.memo(function LocationTag({ city, country }) {
  return (
    <div className="location-tag">
      <span aria-hidden>{flags.find((item) => item.name === country)?.emoji}</span>
      {`${city}, ${country}`}
    </div>
  );
});
