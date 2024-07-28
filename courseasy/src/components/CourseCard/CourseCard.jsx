import {
  Box,
  Button,
  Card,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ id, image, title, description, creator }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  return (
    <Box
      width={'xs'}
      height={'md'}
      boxShadow={'dark-lg'}
      bg={cardBg}
      borderRadius="lg"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={image}
        alt={title}
        borderRadius="lg"
        width={'xs'}
        objectFit={'contain'}
      />
      <Stack mt="6" ml="3" spacing="4" flex="1">
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
        <Text>
          Creator -{' '}
          <span style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
            {creator}
          </span>
        </Text>
      </Stack>
      <Box mt="auto" mb="4" display="flex" justifyContent="center">
        <Link to={`/course/${id}`} state={{ title: title }}>
          <Button w={'32'} colorScheme={'blue'}>
            Explore
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CourseCard;
