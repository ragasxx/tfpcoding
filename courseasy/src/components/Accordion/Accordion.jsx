import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

const LectureAccordion = ({ title, description }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'blue.300', color: 'white' }}>
            <Box
              flex="1"
              textAlign="left"
              fontSize={['md', 'md', 'lg']}
              py={[2, 4]}
              fontWeight={'500'}
              fontFamily={'body'}
            >
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{description}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default LectureAccordion;
