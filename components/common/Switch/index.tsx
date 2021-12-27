import React from 'react';

interface ISwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  onColor?: string;
}

export const Switch: React.FC<ISwitchProps> = ({
  isOn,
  handleToggle,
  onColor,
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className='react-switch-checkbox'
        id={`react-switch-new`}
        type='checkbox'
      />
      <label
        style={{ background: isOn ? onColor : '' }}
        className='react-switch-label'
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};
