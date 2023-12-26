import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Heading,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const Email = ({ name, email, phoneNumber = "032 127 0 0 1", message }) => (
  <Html>
    <Head />
    <Preview>Dear Woz</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ mt: "34px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 sm:w-10 sm:h-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z"></path>
            <path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path>
          </svg>
        </Section>
        <Heading
          style={{
            textColor: "black",
            fontSize: "24px",
            textAlign: "center",
            padding: 0,
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <strong>Dear Woz</strong>
        </Heading>
        <Text style={paragraph}>From {name},</Text>
        <Text style={paragraph}>{message}</Text>
        <Hr style={hr} />
        <Text style={paragraph}>
          Email: {email},
          <br />
          Phone Number: {phone}
        </Text>

        <Text style={footer}>Poreto email for Woz</Text>
      </Container>
    </Body>
  </Html>
);

export default Email;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
