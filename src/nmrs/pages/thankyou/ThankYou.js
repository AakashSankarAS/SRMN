import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";

export default function ThankYou() {
  const [sign, setSign] = useState("");
  const handleClick = async () => {
    fetch("https://zoho-sign-fvn2.onrender.com/auth")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setSign(response.url);
      });
  };
  return (
    <Container>
      <Card>
        <CardHeader>
          <h2>Your Form Submitted Successfully</h2>
          <h4>Share your FeedBack</h4>
        </CardHeader>
        <CardBody>
          {/* <iframe
            src="https://survey.zohopublic.in/zs/pHB0za"
            frameborder="0"
            style={{ height: "700px", width: "100%" }}
            marginwidth="0"
            marginheight="0"
            scrolling="auto"
            allow="geolocation"
          ></iframe> */}
          <Row>
            <Col className="text-center">
              <Button onClick={handleClick} className="bg-usrb text-white">
                Zoho Api Hit
              </Button>
            </Col>
          </Row>
          <iframe
            src={sign}
            title="NMRS SURVEY"
            frameborder="0"
            style={{ minHeight: "180vh", width: "100%" }}
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
