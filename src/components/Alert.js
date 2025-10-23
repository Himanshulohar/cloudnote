const Alert = props => {
  // Function to capitalize the first letter of the alert type (e.g., 'success' -> 'Success')
  const capitalize = word => {
    if (word) {
      if (word === 'danger') word = 'Error';
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return '';
  };

  return (
    // Check if props.alert is NOT null before rendering anything
    <div style={{ height: '50px' }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role='alert'
        >
          {/* Capitalize the alert type for better display (e.g., Success, Danger) */}
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
