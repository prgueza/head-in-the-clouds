// Elastic UI Components
import { EuiButton } from "@elastic/eui";

// Styles
import "./IomDeleteConfirmation.scss";

const IomDeleteConfirmation = ({ text, onConfirm, isLoading }) => {
  return (
    <div className="iom-delete-confirmation">
      <p>{text}</p>
      <EuiButton
        data-testid="delete-button"
        size="s"
        color="danger"
        isLoading={isLoading}
        onClick={onConfirm}
      >
        Delete
      </EuiButton>
    </div>
  );
};

export default IomDeleteConfirmation;
