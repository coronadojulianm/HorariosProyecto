import PropTypes from 'prop-types';

export const Button = ({ children, onClick = () => {}, className = '', type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-red-500 text-white px-4 py-2 rounded-md mt-4 ${className}`}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

  
