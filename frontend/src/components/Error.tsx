import { Alert } from "reactstrap";

interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps): JSX.Element | null {
  if (!error) {
    return null;
  }
  return <Alert color="danger">{error}</Alert>;
}
