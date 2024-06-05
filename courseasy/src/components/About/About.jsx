import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  scroll,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import terms from '../../assets/docs/termsAndCondition';

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding="8">
    <VStack>
      <Avatar
        src="https://wallpaperaccess.com/full/551959.jpg"
        boxSize={['40', '48']}
      />
      <Text children="Co-Founder" opacity={0.7} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Kaito" size={['md', 'xl']} />
      <Text
        children={`Hi, I am a full-stack developer and a teacher.Our mission is to 
    quality content at reasonable price.`}
        textAlign={['center', 'left']}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={introVideo}
      autoPlay
      muted
    />
  </Box>
);

const TandC = ({ termsAndCondition }) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms and Conditions"
      textAlign={['center', 'left']}
      my="4"
    ></Heading>
    <Box h={'sm'} p="4" overflowY={'scroll'}>
      <Text
        fontFamily={'heading'}
        letterSpacing="widest"
        textAlign={['center', 'left']}
      >
        {termsAndCondition}
      </Text>
      <Heading
        my={'8'}
        size="xs"
        children="Refund Only Applicable for Cancellation within 7 days"
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={'container.lg'} padding="16" boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']}></Heading>
      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems="center">
        <Text
          fontFamily={'cursive'}
          m="8"
          textAlign={['center', 'left']}
          children="We are a video streaming platform with some premium courses available only for premium users"
        ></Text>
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC termsAndCondition={terms} />
      <HStack my={'4'} py={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily="sans-serif"
          textTransform={'uppercase'}
          children="Payment is secured by Razorpay"
        />
      </HStack>
    </Container>
  );
};

export default About;
