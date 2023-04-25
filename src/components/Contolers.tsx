import { Flex, Button } from '@chakra-ui/react'
import microfone from '../assets/microfone.png'
import camera from '../assets/camera.png'
import compartilhaTela from '../assets/compatilhaTela.png'
import gravando from '../assets/gravando.png'

interface Props {
  leave: () => void
  toggleMic: () => void
  toggleWebcam: () => void
  toggleScreenShare: () => void
}
export const MeetingControlers: React.FC<Props> = ({
  leave,
  toggleMic,
  toggleWebcam,
  toggleScreenShare,
}: Props) => {
  return (
    <Flex
      id="barra-de-controles"
      justifyContent="center"
      alignItems="center"
      p="16px"
      w="100%"
      h="100px"
      background="rgba(31, 41, 55, 0.5);"
      border="1px solid rgba(55, 65, 81, 0.5);"
    >
      <Flex
        maxW="762px"
        h="68px"
        id="caixa de controles"
        alignItems="center"
        gap="59px"
      >
        <Flex
          id="caixa de icones dos controles"
          justifyContent="center"
          alignItems="center"
          p="0"
          gap="16px"
        >
          <Button
            id="icones"
            justifyContent="center"
            alignItems="center"
            p="0"
            w="76px"
            h="56px"
            background="rgba(55, 65, 81, 0.5);"
            border="1px solid rgba(75, 85, 99, 0.5);"
            borderRadius="8px"
            cursor="pointer"
            _hover={{ background: '#43b8f6' }}
            onClick={toggleMic}
          >
            <img
              src={microfone}
              style={{ width: 'auto', height: 'auto' }}
              alt=""
            />
          </Button>
          <Button
            id="icones"
            justifyContent="center"
            alignItems="center"
            p="0"
            w="76px"
            h="56px"
            background="rgba(55, 65, 81, 0.5);"
            border="1px solid rgba(75, 85, 99, 0.5);"
            borderRadius="8px"
            cursor="pointer"
            _hover={{ background: '#2D8CFF' }}
            onClick={toggleWebcam}
          >
            <img
              src={camera}
              style={{ width: 'auto', height: 'auto' }}
              alt=""
            />
          </Button>
          <Button
            id="icones"
            justifyContent="center"
            alignItems="center"
            p="0"
            w="76px"
            h="56px"
            background="rgba(55, 65, 81, 0.5);"
            border="1px solid rgba(75, 85, 99, 0.5);"
            borderRadius="8px"
            cursor="pointer"
            _hover={{ background: '#2D8CFF' }}
            onClick={toggleScreenShare}
          >
            <img
              src={compartilhaTela}
              style={{ width: 'auto', height: 'auto' }}
              alt=""
            />
          </Button>
          <Button
            id="icones"
            justifyContent="center"
            alignItems="center"
            p="0"
            w="76px"
            h="56px"
            background="rgba(55, 65, 81, 0.5);"
            border="1px solid rgba(75, 85, 99, 0.5);"
            borderRadius="8px"
            cursor="pointer"
            _hover={{ background: '#2D8CFF' }}
          >
            <img
              src={gravando}
              style={{ width: 'auto', height: 'auto' }}
              alt=""
            />
          </Button>
        </Flex>
        <Button
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          p="0px"
          background="#EF4444"
          h="56px"
          w="115px"
          borderRadius="8px"
          border="none"
          color="#FFFFFF"
          fontSize="12px"
          fontWeight="500"
          cursor="pointer"
          onClick={leave}
        >
          Sair da Reunião
        </Button>
      </Flex>
    </Flex>
  )
}
