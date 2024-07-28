import {
  Box,
  Stack,
  VStack,
  Heading,
  Link,
  HStack,
  Icon,
} from '@chakra-ui/react';
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGooglePlay,
  FaFacebook,
  FaPhoneAlt,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']} justifyContent="space-between">
        <VStack alignItems={['center', 'flex-start']} width={['full', '7xl']}>
          <Heading color={'white'} size={['1.6rem', 'md']}>
            All Rights Reserved
          </Heading>
          <Heading color={'white'} fontFamily={'cursive'} size={['xs', 'sm']}>
            @TFPCODING
          </Heading>
        </VStack>
        <VStack alignItems={['center', 'flex-start']} color={'white'}>
          <Heading
            color={'white'}
            fontFamily={'sans-serif'}
            size={['xs', 'sm']}
          >
            Behind BJP Office, Bharahut Nagar, Satna, 485001
          </Heading>

          <HStack>
            <FaPhoneAlt />
            <Link href="tel:+918815298130"> +91 8815298130</Link>
          </HStack>
        </VStack>
        <HStack
          justifyContent={['center', 'flex-end']}
          spacing={4}
          color={'white'}
        >
          <Link href="https://m.facebook.com/tfpcoding/" isExternal>
            <Icon as={FaFacebook} w={6} h={6} />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.tfp.coding.classes"
            isExternal
          >
            <Icon as={FaGooglePlay} w={6} h={6} />
          </Link>
          <Link
            href="https://youtube.com/@tfpcodingclasses?si=XQ3zoXsyeMthsWq3"
            isExternal
          >
            <Icon as={FaYoutube} w={6} h={6} />
          </Link>
          <Link href="https://x.com/tfpcoding" isExternal>
            <Icon as={FaTwitter} w={6} h={6} />
          </Link>
          <Link
            href="https://instagram.com/tfpcoding?igsh=MTZ2wdmcHdlbmFieQ=="
            isExternal
          >
            <Icon as={FaInstagram} w={6} h={6} />
          </Link>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
