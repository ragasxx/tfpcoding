import {
  Button,
  Heading,
  Stack,
  VStack,
  Text,
  Image,
  Box,
  Card,
  useColorModeValue,
} from '@chakra-ui/react';

import afroz from '../../assets/images/afroz.jpg';
import prince from '../../assets/images/prince.jpg';
import shubham from '../../assets/images/shubham.jpg';

import box from '../../assets/images/box.png';
import teacher from '../../assets/images/teacher.png';
import project from '../../assets/images/project.png';

import exf from '../../assets/images/exf.jpg';
import ge from '../../assets/images/ge.jpg';
import sp from '../../assets/images/sp.jpg';
import bt from '../../assets/images/bachelors_tiffun_logo.jpg';
import ws from '../../assets/images/woodstubb_logo.jpg';

import { Link } from 'react-router-dom';

import React, { useEffect } from 'react';
import './home.css';
import tfp from '../../assets/images/tfp.png';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllCourses } from '../../redux/actions/course';
import CourseCard from '../CourseCard/CourseCard';
import MasonryLayout from '../MasonryLayout/MasonryLayout';

const images = [exf, sp, ge, bt, ws].map(image => ({
  id: crypto.randomUUID(),
  image,
}));

const testimonials = [
  {
    text: 'A big thank you to the TFPCoding team for this amazing learning experience! Shubham and Prince were incredible mentors, always ready with guidance and support. Their expertise made complex topics easy to understand. Highly recommend this coaching center!',
    author: 'Pratiksha Pasari',
    color: '#A5D6A7',
  },
  {
    text: "I'm grateful to TFPCoding for transforming my coding skills. The personalized attention from Shubham and Prince made all the difference. Their dedication and passion for teaching are unmatched. Thank you for everything!",
    author: 'Pruthvi R',
    color: '#EF9A9A',
  },
  {
    text: 'TFPCoding has been a game-changer for me. The mentorship from Shubham and Prince was exceptional, helping me grow both technically and personally.',
    author: 'Vishalika',
    color: '#FFCC80',
  },
  {
    text: 'I had an amazing time at TFPCoding! The mentorship from Shubham and Prince was top-notch. They encouraged us to think critically and solve problems creatively. I feel much more confident in my coding abilities now. Thank you',
    author: 'Anonymous',
    color: '#90CAF9',
  },
  {
    text: 'TFPCoding is the best coaching center Ive attended. Shubham and Prince are inspiring mentors who always pushed us to do our best. Their dedication to their students is evident in every session. I am so grateful for their support and guidance.',
    author: 'Joshua Coutinho',
    color: '#FFF59D',
  },
  {
    text: 'Huge thanks to TFPCoding for this incredible experience. Shubham and Prince were fantastic mentors, always ready to help with any questions or challenges. Their teaching methods are both innovative and effective. I learned so much from them',
    author: 'Sami',
    color: '#B39DDB',
  },
  {
    text: 'Shoutout to TFPCoding for providing such a comprehensive and enjoyable learning experience. The mentorship from Shubham and Prince was invaluable, and their passion for teaching made every session engaging. Highly recommend to anyone looking to improve their coding skills.',
    author: 'Sakshi Raturi',
    color: '#FFAB91',
  },
  {
    text: "TFPCoding exceeded all my expectations. Shubham and Prince are exceptional mentors who genuinely care about their students' progress. Their feedback and guidance helped me grow as a coder and a problem solver. Thank you for everything!",
    author: 'Pratiksha Pasari',
    color: '#A5D6A7',
  },
  {
    text: "From the story time+breakout+spotlights it's just been well vibing the whole three months. @ABNUX and @jayneil, you shielded us with to take actionable feedback (going back to the loop) states to right design and making the design right, covering whole aspects of design!! thank you sensai’s",
    author: 'Pruthvi R',
    color: '#EF9A9A',
  },
  {
    text: 'Thank you, TFPCoding, for this wonderful experience. Shubham and Prince are fantastic mentors who always encouraged us to think outside the box. Their insights and feedback were incredibly helpful, and I feel much more confident in my skills now',
    author: 'Vishalika',
    color: '#FFCC80',
  },
  {
    text: 'TFPCoding has been an incredible journey for me. Shubham and Prince are amazing mentors who made learning both fun and effective. Their dedication to their students is truly inspiring, and I am grateful for all their support and guidance',
    author: 'Anonymous',
    color: '#90CAF9',
  },
  {
    text: `I can't thank TFPCoding enough for this amazing experience. Shubham and Prince were phenomenal mentors, always there to provide guidance and support. Their teaching style is both engaging and effective, making complex topics easy to understand.`,
    author: 'Joshua Coutinho',
    color: '#FFF59D',
  },
  {
    text: "Thank you, TFPCoding, for such an enriching learning journey. Shubham and Prince are exceptional mentors who always pushed us to reach our full potential. Their feedback and insights were incredibly valuable, and I'm grateful for their support.",
    author: 'Sami',
    color: '#B39DDB',
  },
  {
    text: 'A huge thank you to TFPCoding for this incredible learning experience. Shubham and Prince were amazing mentors, always ready with guidance and support. Their dedication and passion for teaching made all the difference in my learning journey',
    author: 'Sakshi Raturi',
    color: '#FFAB91',
  },
];

const Home = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('black', 'gray.200');

  const { courses, error, message } = useSelector(state => state.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses());
  }, [dispatch, error, message]);

  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack width={'full'} alignItems={['center', 'flex-end']}>
            <Heading children="FUTURE PROGRAMMER" size={'xl'} />
            <Text children="Unlock the world of coding with our expert-led coding classes" />
            <Link to="/courses">
              <Button size={['md', 'lg']} colorScheme="blue" m={'3'}>
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={tfp}
            objectFit="contain"
          />
        </Stack>
      </div>

      <Box padding={'5'} bg="blackAlpha.800"></Box>

      <div className="container2">
        <Heading children="Our Courses" textAlign={['center', 'start']} m="8" />
        {courses.length > 0 ? (
          <Stack
            direction={['column', 'row']}
            height="100%"
            justifyContent={['center', 'space-between']}
            alignItems="center"
            spacing={['16', '56']}
          >
            {courses.length > 0 &&
              courses.map(item => (
                <CourseCard
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  image={item.poster.url}
                  id={item._id}
                  creator={item.createdBy}
                />
              ))}
          </Stack>
        ) : (
          <Box width={'full'} h={'fit-content'} textAlign={'center'}>
            <Heading
              mt={['44', '52']}
              children="No Courses Found!!!!"
              size={['md', 'xl']}
              letterSpacing={'wide'}
            />
          </Box>
        )}
      </div>

      <Box padding={'5'} bg="blackAlpha.800"></Box>

      <div className="container3">
        <Heading
          children={'Our Team'}
          textAlign={['center', 'start']}
          mb={'5'}
        />

        <Stack
          direction={['column', 'row']}
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <Card
            width={'xs'}
            height={'min-content'}
            boxShadow={'dark-lg'}
            _hover={{ transform: 'scale(1.05)' }}
            bg={cardBg}
            transition="transform 0.2s"
          >
            <Image
              src={shubham}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              objectFit={'contain'}
              minWidth={'100%'}
            />
            <Stack alignItems={'center'} mt={'3'}>
              <Heading size="md">Shubham Singh</Heading>
              <Text fontSize={'md'} fontFamily={'sans-serif'}>
                Java Expert
              </Text>
            </Stack>
          </Card>

          <Card
            width={'xs'}
            height={'min-content'}
            boxShadow={'dark-lg'}
            _hover={{ transform: 'scale(1.05)' }}
            bg={cardBg}
            transition="transform 0.2s"
          >
            <Image
              src={prince}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              objectFit={'contain'}
              minWidth={'100%'}
            />
            <Stack alignItems={'center'} mt={'3'}>
              <Heading size="md"> Prince Singh </Heading>
              <Text fontSize={'md'} fontFamily={'sans-serif'}>
                Python & MERN Stack Expert
              </Text>
            </Stack>
          </Card>

          <Card
            width={'xs'}
            height={'min-content'}
            boxShadow={'xl'}
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s"
            bg={cardBg}
          >
            <Image
              src={afroz}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              objectFit={'contain'}
              minWidth={'100%'}
            />
            <Stack alignItems={'center'} mt={'3'}>
              <Heading size="md">MD Afroz Khan</Heading>
              <Text fontSize={'md'} fontFamily={'sans-serif'}>
                Placement Coordinator
              </Text>
            </Stack>
          </Card>
        </Stack>
      </div>

      <div className="container5">
        <Heading p={'5rem'} m={'3'}>
          Our Partners
        </Heading>
        <Banner images={images} speed={5000} />
      </div>

      <div className="container4">
        <Heading children={'Why Choose Us'} />
        <Text
          children={
            'Our Mission is to empower students with the knowledge and skills needed to thrive in an increasingly digital world. We believe that coding is more than just lines of text.'
          }
          mt={'5'}
          fontFamily={'sans-serif'}
        />

        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
          marginTop={['10', '16']}
        >
          <Card
            bg={cardBg}
            width={'xs'}
            height={'min-content'}
            boxShadow={'dark-lg'}
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s"
          >
            <Box
              borderRadius="full"
              borderWidth="4px"
              borderColor={borderColor}
              overflow="hidden"
              width="150px"
              height="150px"
              mx="auto"
              mt={'2'}
            >
              <Image
                src={teacher}
                alt="Green double couch with wooden legs"
                width="100%"
                height="100%"
                objectFit={'cover'}
              />
            </Box>

            <Stack alignItems={'center'} mt={'3'} spacing={'6'}>
              <Heading size="md">Expert Instructors</Heading>
              <Text fontFamily={'mono'} p={'3'}>
                Our coding classes are led by a team of experienced and
                knowledgeable instructors. They bring a wealth of expertise in
                the field, ensuring that students receive top-notch guidance and
                mentorship throughout their learning journey.
              </Text>
            </Stack>
          </Card>

          <Card
            bg={cardBg}
            width={'xs'}
            height={'min-content'}
            boxShadow={'dark-lg'}
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s"
          >
            <Box
              borderRadius="full"
              borderWidth="4px"
              borderColor={borderColor}
              overflow="hidden"
              width="150px"
              height="150px"
              mx="auto"
              mt={'2'}
            >
              <Image
                src={project}
                alt="Green double couch with wooden legs"
                width="100%"
                height="100%"
                objectFit={'cover'}
              />
            </Box>

            <Stack alignItems={'center'} mt={'3'} spacing={'6'}>
              <Heading size="md">Live Projects</Heading>
              <Text fontFamily={'mono'} p={'3'}>
                Beyond theoritical knowledge, students have the opportunity to
                work on live coding projects, gaining valuable experience in
                real-world scenarios and enhancing their problem-solvinf skills.
                This will make the students placement ready.
              </Text>
            </Stack>
          </Card>

          <Card
            bg={cardBg}
            width={'xs'}
            height={'min-content'}
            boxShadow={'dark-lg'}
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.2s"
          >
            <Box
              borderRadius="full"
              borderWidth="4px"
              borderColor={borderColor}
              overflow="hidden"
              width="150px"
              height="150px"
              mx="auto"
              mt={'2'}
            >
              <Image
                src={box}
                alt="Green double couch with wooden legs"
                width="100%"
                height="100%"
                objectFit={'cover'}
              />
            </Box>

            <Stack alignItems={'center'} mt={'3'} spacing={'6'}>
              <Heading size="md">Placement Opportunities</Heading>
              <Text fontFamily={'mono'} p={'3'}>
                We go the extra mile to help our students transition from
                learning to a career. We provide resources and support to
                increase their chances of securing a job in the tech industry
                after completing our programs.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </div>

      <Box padding={'5'} bg="blackAlpha.800"></Box>

      <div className="container6">
        <MasonryLayout testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Home;

const Banner = ({ images, speed = 5000 }) => {
  return (
    <div className="inner">
      <div className="wrapper">
        <div className="banner" style={{ '--speed': `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div key={id}>
              <img className="bannerImg" src={image} alt={id} />
            </div>
          ))}
        </div>
        <div className="banner" style={{ '--speed': `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div key={id}>
              <img className="bannerImg" src={image} alt={id} />
            </div>
          ))}
        </div>
        <div className="banner" style={{ '--speed': `${speed}ms` }}>
          {images.map(({ id, image }) => (
            <div key={id}>
              <img className="bannerImg" src={image} alt={id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
