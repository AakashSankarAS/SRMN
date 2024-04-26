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
    const actionsJson = {
      recipient_name: "aakash",
      recipient_email: "aakashsankar412@gmail.com",
      action_type: "SIGN",
      private_notes: "Please get back to us for further queries",
      signing_order: 0,
      verify_recipient: true,
      verification_type: "EMAIL",
      is_embedded: true,
    };

    const documentJson = {
      request_name: "testDoc",
      expiration_days: 2,
      is_sequential: true,
      email_reminders: true,
      reminder_period: 8,
      actions: [actionsJson],
    };

    const data = {
      requests: documentJson,
    };

    const payload = new FormData();

    // Simulate file upload
    const files = ["https://zohosign.tiiny.site"];
    const file = await fetch(files[0]).then((res) => res.blob());
    payload.append("file", file);

    payload.append("data", JSON.stringify(data));

    const HEADERS = {
      Authorization:
        "Zoho-oauthtoken 1000.ff2cbeba05c1c4fff98197f0ea8dff87.ae0764faeca05c169e6ee407b03cd145",
    };

    const URL = "https://sign.zoho.in/api/v1/requests";
    const requestOptions = {
      method: "POST",
      headers: HEADERS,
      body: payload,
    };

    try {
      const response = await fetch(URL, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonResponse = await response.json();
      const requestId = jsonResponse.request_id;
      const actionId = jsonResponse.actions[0].action_id;

      const actionsJson1 = {
        action_id: jsonResponse.actions[0].action_id,
        recipient_name: jsonResponse.actions[0].recipient_name,
        recipient_email: jsonResponse.actions[0].recipient_email,
        action_type: jsonResponse.actions[0].action_type,
      };

      const fieldJson = {
        document_id: jsonResponse.document_ids[0].document_id,
        field_name: "Signature",
        field_type_name: "Signature",
        field_label: "Text - 1",
        field_category: "Signature",
        abs_width: "200",
        abs_height: "18",
        is_mandatory: true,
        x_coord: "30",
        y_coord: "30",
        page_no: 0,
      };

      actionsJson1["fields"] = [fieldJson];

      const documentJson1 = {
        actions: [actionsJson1],
      };

      const data1 = {
        requests: documentJson1,
      };

      const payload1 = new FormData();
      payload1.append("data", JSON.stringify(data1));

      const URL1 = `https://sign.zoho.in/api/v1/requests/${requestId}/submit`;
      const requestOptions1 = {
        method: "POST",
        headers: HEADERS,
        body: payload1,
      };

      const response1 = await fetch(URL1, requestOptions1);
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonResponse1 = await response1.json();

      const payload2 = new FormData();
      payload2.append("host", "https://srmn.vercel.app");

      const URL2 = `https://sign.zoho.in/api/v1/requests/${requestId}/actions/${actionId}/embedtoken`;
      const requestOptions2 = {
        method: "POST",
        headers: HEADERS,
        body: payload2,
      };

      const response2 = await fetch(URL2, requestOptions2);
      if (!response2.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonResponse2 = await response2.json();

      setSign(jsonResponse2.sign_url);
    } catch (error) {
      console.error("Error:", error);
    }
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
