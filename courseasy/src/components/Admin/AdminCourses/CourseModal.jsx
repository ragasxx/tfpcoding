import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteLectureButtonHandler,
  courseTitle,
  lectures = [],
  addLectureHandler,
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [video, setVideo] = useState('');
  // const [videoPrev, setVideoPrev] = useState('');

  const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',

    backgroundColor: '#D6BCFA',
  };

  const fileUploadStyle = {
    '&::file-selector-button': fileUploadCss,
  };

  // const changeVideoHandler = e => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onloadend = () => {
  //     setVideoPrev(reader.result);
  //     setVideo(file);
  //   };
  // };

  const onCloseVideoRemove = () => {
    setDescription('');
    setTitle('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size={'full'} scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>

        <ModalBody p={'16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>
              <Heading children="Lectures" size={'lg'} />
              {lectures.map((item, i) => (
                <VideoCard
                  key={i}
                  title={item.title}
                  description={item.description}
                  num={i + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteLectureButtonHandler={deleteLectureButtonHandler}
                />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={e => addLectureHandler(e, id, title, description)}
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  {/* <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.500"
                    css={fileUploadStyle}
                    onChange={changeVideoHandler}
                  /> */}

                  {/* {videoPrev && (
                    <Box width={'60'} objectFit={'contain'}>
                      <video
                        src={videoPrev}
                        controlsList="nodownload"
                        controls
                      />
                    </Box>
                  )} */}

                  <Button
                    isLoading={loading}
                    type="submit"
                    colorScheme="purple"
                    children="Upload"
                  />
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onCloseVideoRemove}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  num,
  title,
  description,
  lectureId,
  courseId,
  deleteLectureButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deleteLectureButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
