import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', className = '', loading = false, ...props }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? <span className={styles.spinner}></span> : children}
        </button>
    );
};

export default Button;
