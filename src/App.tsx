import { Box, Center } from '@chakra-ui/react'
import './styles.css'

import { TopBar } from './components/TopBar'
import { MeetingContainer } from './player/MeetingContainer'

function App() {
  return (
    <Center>
      <Box
        id="container"
        margin="0 auto"
        w="1440px"
        h="884px"
        border="2px solid #7D91AA"
        filter="drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.25))"
        borderRadius="20px"
        display="flex"
        flexDirection="column"
      >
        <TopBar />

        <Box
          display="flex"
          alignItems="left"
          justifyContent="left"
          mt="10px"
          margin="0 auto"
        >
          <MeetingContainer />
        </Box>
      </Box>
    </Center>
  )
}

export default App
