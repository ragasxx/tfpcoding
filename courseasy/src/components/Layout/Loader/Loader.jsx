import { Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

const Loader = ({ color = 'blue.300' }) => {
  return (
    <VStack h={'100vh'} justifyContent={'center'}>
      <div>
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="transparent"
          color={color}
          size={'xl'}
        />
      </div>
    </VStack>
  );
};

export default Loader;
