import React, { forwardRef } from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchForm = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const PriceInput = forwardRef(({ type, value, onChange }, inputComponent) => (
  <div>
    <h2>
      {type.title} {value ? `- ${formatMoney(value / 100)}` : ''}
    </h2>
    <p>{type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={(event) => onChange(createPatchForm(event.target.value))}
      ref={inputComponent}
    />
  </div>
));

export default PriceInput;
