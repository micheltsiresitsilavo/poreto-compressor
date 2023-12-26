import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const Email = ({ name, email, phoneNumber = "032 127 0 0 1", message }) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Dear Woz</Preview>

        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
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
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Dear Woz</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              From {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              {message}
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              From: {name}
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Email: {email}
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Phone Number: {phoneNumber}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;
