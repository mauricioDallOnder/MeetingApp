import React, { useCallback, useState } from 'react'
import { MeetingProvider } from '@videosdk.live/react-sdk'
import axios from 'axios'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { MeetingJoinSession } from './MeetingJoinSession'

const apiUrl = 'https://reuniao.onrender.com/create-room'
const getTokenUrl = 'https://reuniao.onrender.com/get-token'

interface FormState {
  id: string
  roomId: string
}

interface InputFieldProps {
  placeHolder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  placeHolder,
  value,
  onChange,
}) => (
  <Box>
    <Input
      placeholder={placeHolder}
      type="text"
      value={value}
      onChange={onChange}
      w="159px"
      h="56px"
      textAlign="center"
      required
    />
  </Box>
)

export const MeetingContainer: React.FC = () => {
  const [token, setToken] = useState('')
  const [roomName, setRoomName] = useState('')
  const [name, setName] = useState('')
  const [errorMessage] = useState('')
  const [joined, setJoined] = useState(false)
  const [inputRoomId, setInputRoomId] = useState('')

  const [form, setForm] = useState<FormState>({
    id: '',
    roomId: '',
  })

  const getToken = async (): Promise<string> => {
    try {
      const response = await axios.get(getTokenUrl)
      return response.data.token
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  const generateRoom = async () => {
    const fetchedToken = await getToken()
    setToken(fetchedToken)
    console.log(token)
    if (!inputRoomId) {
      try {
        const response = await axios.post(apiUrl, {
          token: fetchedToken,
          region: 'us-west-2',
        })
        const data = response.data
        setForm({
          ...form,
          id: `${fetchedToken}`,
          roomId: roomName || data.roomId,
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      setForm({
        ...form,
        id: `${fetchedToken}`,
        roomId: inputRoomId,
      })
    }
  }
  async function deactivateRoom() {
    try {
      const response = await axios.post(
        'https://reuniao.onrender.com/deactivate-room',
        {
          roomId: form.roomId,
        },
      )
      console.log(response.data)
    } catch (error) {
      console.error('Error deactivating room:', error)
    }
    setForm({
      id: '',
      roomId: '',
    })
  }

  const handleJoinWithInputRoomId = () => {
    setRoomName(inputRoomId)
    generateRoom()
  }

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    },
    [],
  )

  const handleInputRoomIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputRoomId(e.target.value)
    },
    [],
  )

  return (
    <Flex flexDirection="column" w="1112px" mt="50px">
      <Flex
        flexDir={{ base: 'column', md: 'column' }}
        gap="5px"
        margin="0 auto"
      >
        <InputField
          placeHolder={'Nome'}
          value={name}
          onChange={handleNameChange}
        />
        <InputField
          value={inputRoomId}
          onChange={handleInputRoomIdChange}
          placeHolder={'Digite o id da sala'}
        />
        <Button
          justifyContent="center"
          alignItems="center"
          p="0"
          w="150px"
          h="56px"
          background="#43b8f6"
          border="1px solid rgba(75, 85, 99, 0.5);"
          borderRadius="8px"
          cursor="pointer"
          color="#FFFFFF"
          fontSize="12px"
          fontWeight="500"
          onClick={generateRoom}
        >
          Criar Nova Sala
        </Button>
        <Button
          justifyContent="center"
          alignItems="center"
          p="0"
          w="150px"
          h="56px"
          color="#FFFFFF"
          fontSize="12px"
          fontWeight="500"
          background="#43A047"
          border="1px solid rgba(75, 85, 99, 0.5);"
          borderRadius="8px"
          cursor="pointer"
          onClick={handleJoinWithInputRoomId}
        >
          Abrir Sala
        </Button>
        <Button
          justifyContent="center"
          alignItems="center"
          p="0"
          w="150px"
          h="56px"
          background="#EF4444"
          color="#FFFFFF"
          fontSize="12px"
          fontWeight="500"
          border="1px solid rgba(75, 85, 99, 0.5);"
          borderRadius="8px"
          cursor="pointer"
          onClick={deactivateRoom}
          colorScheme="red"
          ml={2}
        >
          Encerrar Sala
        </Button>
      </Flex>
      {form.roomId && (
        <MeetingProvider
          config={{
            meetingId: roomName || form.roomId,
            name: name || 'Participante Anônimo',
            micEnabled: true,
            webcamEnabled: true,
            maxResolution: 'hd',
            multiStream: true,
            mode: 'CONFERENCE',
          }}
          token={token}
          joinWithoutUserInteraction={true}
        >
          <MeetingJoinSession
            meetingId={form.roomId}
            joined={joined}
            setJoined={setJoined}
            errorMessage={errorMessage}
          />
        </MeetingProvider>
      )}
    </Flex>
  )
}
