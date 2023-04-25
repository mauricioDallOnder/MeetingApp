import { Button, Box, Text } from '@chakra-ui/react'
import { useMeeting } from '@videosdk.live/react-sdk'
import { useState, useEffect, useMemo } from 'react'
import { ParticipantsGrid } from './ParticipantsGrid'
import { MeetingControlers } from '../components/Contolers'

interface MeetingComponentProps {
  meetingId: string
  joined: boolean
  setJoined: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
}

export const MeetingJoinSession: React.FC<MeetingComponentProps> = ({
  meetingId,
  joined,
  setJoined,
  errorMessage,
}) => {
  const {
    join,
    leave,
    toggleMic,
    toggleWebcam,
    toggleScreenShare,
    participants,
    localParticipant,
  } = useMeeting()

  const [participantCount, setParticipantCount] = useState(0)
  console.log('tamanho' + participants.size)
  useEffect(() => {
    setParticipantCount(participants.size - 1)
  }, [participants])

  const joinMeeting = () => {
    setJoined(true)
    join()
  }

  const leaveMeeting = () => {
    setJoined(false)
    leave()
  }

  const filteredParticipants = useMemo(
    () =>
      Array.from(participants.keys()).filter(
        (id) => id !== localParticipant.participantId,
      ),
    [participants, localParticipant],
  )

  return (
    <Box>
      <ParticipantsGrid
        participants={filteredParticipants.slice(0, participantCount)}
        localParticipantId={
          localParticipant ? localParticipant.participantId : ''
        }
      />
      {joined ? (
        <>
          <Text as="h1" color="#FFFFFF">
            Meeting ID: {meetingId}
          </Text>
          <MeetingControlers
            leave={leaveMeeting}
            toggleMic={() => toggleMic()}
            toggleWebcam={() => toggleWebcam()}
            toggleScreenShare={() => toggleScreenShare()}
          />
        </>
      ) : (
        <>
          <Text as="h1" color="#FFFFFF">
            Meeting ID: {meetingId}
          </Text>
          <Button
            mt="16px"
            justifyContent="center"
            alignItems="center"
            p="0"
            w="150px"
            h="56px"
            background="linear-gradient(144.11deg, #C961DE 13.74%, #2954A3 90.91%);"
            border="1px solid rgba(75, 85, 99, 0.5);"
            borderRadius="8px"
            cursor="pointer"
            color="#FFFFFF"
            fontSize="12px"
            fontWeight="500"
            onClick={joinMeeting}
          >
            Entrar na Reunião
          </Button>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
        </>
      )}
    </Box>
  )
}
