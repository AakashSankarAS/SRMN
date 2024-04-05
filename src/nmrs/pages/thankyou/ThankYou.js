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
          <iframe
            src="https://sign.zoho.in/zsguest?locale=en&sign_id=234b4d535f495623da4eee598214ff8debbd391c1006531c2ee1c1c2593d0c230ca9ce322fab758c3f49d371573adcea76daa2b9859cf1991e6554a52904c73f2f53e78a054fd8cc29f56c6a164846848ad990de40800e47e38694159be8ec488b7d1aad0df8242f851eacefb9dd4cf6525fd9fe974cbf1b0485525d42cb4e6d1a900fcc027192f4&frameorigin=https://srmn.vercel.app"
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
