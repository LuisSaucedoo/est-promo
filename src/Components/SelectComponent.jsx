import PropTypes from 'prop-types';
import '../styles/selectComponent.css'

const SelectComponent = ({ label, options, value, onChange, hasValue }) => {
  return (
    <div className='select-container'>
      <label className='label'>{label}</label>
      <select value={value} onChange={onChange}  className='select-option'>
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {!hasValue && <p className='error-message'>Seleccione una opción</p>}
    </div>
  );
};

SelectComponent.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    hasValue: PropTypes.bool.isRequired, // Declaración de validación
  };

export default SelectComponent;
