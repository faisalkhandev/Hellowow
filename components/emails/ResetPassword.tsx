import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  
  interface ResetPasswordProps {
    resetLink?: string;
  }
  
 const nifawow="https://res.cloudinary.com/dst0tchqi/image/upload/c_thumb,w_200,g_face/v1729802093/DarkNifaWow_u4tlbb.png"
  
  export default function ResetPassword({
    resetLink = '596853',
  }: ResetPasswordProps) {
    return (
      <Html>
        <Head />
        <Preview>Reset NifaWow Account Password</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={coverSection}>
              <Section style={imageSection}>
              <Img
                  src={nifawow}
                  width='140'
                  height='140'
                  alt='Nifawow Logo'
                />
              </Section>
              <Section style={upperSection}>
                <Heading style={h1}>
                  Reset your {"NifaWow's"} Account Password
                </Heading>
                <Text style={mainText}>
                  We just received a password reset request associated with this
                  email. Please click on the following link to reset your
                  password. If you don&apos;t want to reset your password or you{' '}
                  {"didn't"} initiated this reset request then you can ignore this
                  message.
                </Text>
                <Section style={verificationSection}>
                  <Text style={verifyText}>Reset Password Link</Text>
                  <Section style={buttonContainer}>
                    <Button style={button} href={resetLink}>
                      Reset Password
                    </Button>
                    <Text style={validityText}>
                      This link is valid for 1 hours only
                    </Text>
                  </Section>
                </Section>
              </Section>
              <Hr />
              <Section style={lowerSection}>
                <Text style={cautionText}>
                  Note: NifaWow will never email you and ask you to disclose or
                  verify your password, credit card, or banking account number.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
  
  const main = {
    backgroundColor: '#fff',
    color: '#212121',
  };
  
  const container = {
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#eee',
  };
  
  const h1 = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
  };
  
  const link = {
    color: '#2754C5',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    textDecoration: 'underline',
  };
  
  const text = {
    color: '#333',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: '14px',
    margin: '24px 0',
  };
  
  const imageSection = {
    // backgroundColor: '#252f3d',
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const coverSection = { backgroundColor: '#fff' };
  
  const upperSection = { padding: '25px 35px' };
  
  const lowerSection = { padding: '25px 35px' };
  
  const footerText = {
    ...text,
    fontSize: '12px',
    padding: '0 20px',
  };
  
  const verifyText = {
    ...text,
    margin: 0,
    fontWeight: 'bold',
    textAlign: 'center' as const,
  };
  
  const codeText = {
    ...text,
    fontWeight: 'bold',
    fontSize: '36px',
    margin: '10px 0',
    textAlign: 'center' as const,
  };
  
  const validityText = {
    ...text,
    margin: '0px',
    textAlign: 'center' as const,
  };
  
  const verificationSection = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const mainText = { ...text, marginBottom: '14px' };
  
  const cautionText = { ...text, margin: '0px' };
  
  const verifyButton = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };
  const buttonContainer = {
    padding: '5px',
  };
  
  const button = {
    backgroundColor: '#5e6ad2',
    borderRadius: '3px',
    fontWeight: '600',
    color: '#fff',
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '11px 23px',
  };