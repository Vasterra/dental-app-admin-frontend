import React from "react";
import styles from './ButtonBack.module.css';

interface ButtonBackProps {
  alreadyFiltered: boolean,
  onButtonBackClick: () => void;
}

export const ButtonBack: React.FC<ButtonBackProps> = (props: ButtonBackProps) => {
  return (
    <>
      { props.alreadyFiltered &&
          <button
            type='button'
            className={styles.btnBack}
            onClick={props.onButtonBackClick}
          >
            <img src='../images/arrow_left_big.svg' alt='back to all users list'/>
          </button>
      }
    </>
  )
}
