import { Col, FormGroup, Input } from "reactstrap";
import FormError from "./FormError";

export default function FormSelect({
  children,
  labelText,
  id,
  value,
  onChange,
  hasError,
  md = "3",
  sm = "6",
  disabled,
}) {
  return (
    <Col md={sm} lg={md}>
      <FormGroup>
        <label className="form-control-label text-xs" htmlFor={id}>
          {labelText}
          <p className="d-inline text-danger">*</p>
        </label>
        <Input
          className="form-control mb-0"
          id={id}
          type="select"
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {children}
        </Input>
        {hasError && <FormError>Select {labelText}</FormError>}
      </FormGroup>
    </Col>
  );
}
