import { Card, CardBody, CardHeader, Container } from "reactstrap";

export default function ThankYou() {
  return (
    <Container>
      <Card>
        <CardHeader>
          <h2>Your Form Submitted Successfully</h2>
          <h4>Share your FeedBack</h4>
        </CardHeader>
        <CardBody>
          <iframe
            src="https://survey.zohopublic.in/zs/pHB0za"
            frameborder="0"
            style={{ height: "700px", width: "100%" }}
            marginwidth="0"
            marginheight="0"
            scrolling="auto"
            allow="geolocation"
          ></iframe>
        </CardBody>
      </Card>
    </Container>
  );
}
