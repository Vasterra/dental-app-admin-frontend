import React, {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react';

interface ISwitchProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isOn: boolean;
  handleToggle: () => void;
  key?: string;
  onColor?: string;
}

export const Switch = forwardRef(
  (
    { onColor, isOn, handleToggle, className, ...props }: ISwitchProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    // const [value, setValue] = useState(isOn);
    return (
      <>
        <input
          checked={isOn}
          onChange={() => {
            // setValue(!value);
            handleToggle();
          }}
          name={props.name}
          className='react-switch-checkbox'
          id={props.id}
          type='checkbox'
        />
        <label
          style={{ background: isOn ? onColor : '' }}
          className='react-switch-label'
          htmlFor={props.id}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
  }
);
