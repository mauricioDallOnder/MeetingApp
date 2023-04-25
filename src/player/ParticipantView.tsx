import React, { useRef, useEffect } from 'react'
import { useParticipant } from '@videosdk.live/react-sdk'
import { Box, Flex, Text, Center } from '@chakra-ui/react'

interface ParticipantViewProps {
  participantId: string
  isLocal: boolean
  joined?: boolean
  setJoined?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ParticipantView: React.FC<ParticipantViewProps> = (props) => {
  const webcamRef = useRef<HTMLVideoElement | null>(null)
  const micRef = useRef<HTMLAudioElement | null>(null)
  const screenShareRef = useRef<HTMLVideoElement | null>(null)

  const {
    displayName,
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
  } = useParticipant(props.participantId)

  useEffect(() => {
    if (webcamRef.current) {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(webcamStream.track)
        webcamRef.current.srcObject = mediaStream
        webcamRef.current
          .play()
          .catch((error) =>
            console.error('videoElem.current.play() falhou', error),
          )
      } else {
        webcamRef.current.srcObject = null
      }
    }
  }, [webcamOn, webcamStream])

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(micStream.track)
        micRef.current.srcObject = mediaStream
        micRef.current
          .play()
          .catch((error) =>
            console.error('videoElem.current.play() falhou', error),
          )
      } else {
        micRef.current.srcObject = null
      }
    }
  }, [micOn, micStream])

  useEffect(() => {
    if (screenShareRef.current) {
      if (screenShareOn && screenShareStream) {
        const mediaStream = new MediaStream()
        mediaStream.addTrack(screenShareStream.track)
        screenShareRef.current.srcObject = mediaStream
        screenShareRef.current
          .play()
          .catch((error) =>
            console.error('videoElem.current.play() falhou', error),
          )
      } else {
        screenShareRef.current.srcObject = null
      }
    }
  }, [screenShareOn, screenShareStream])

  return (
    <Box key={props.participantId} mb="4" display="flex" flexDir="column">
      <audio ref={micRef} autoPlay />
      <Flex alignItems="left" mb="2" flexDir="column">
        <Text fontSize="lg" color="#FFFFFF" fontWeight="bold" mt="5px">
          {props.isLocal
            ? `Nome: ${displayName} (Você)`
            : 'Nome: ' + displayName}
        </Text>
      </Flex>
      {webcamOn || micOn ? (
        <Center
          mb="2"
          display="flex"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          <video
            height="80%"
            width="80%"
            ref={webcamRef}
            autoPlay
            style={{
              borderRadius: '8px',
              border: '1px solid rgba(31, 41, 55, 0.5);',
              gap: '24px',
            }}
          />
        </Center>
      ) : null}
      {screenShareOn ? (
        <Box mb="2">
          <video height="100%" width="100%" ref={screenShareRef} autoPlay />
        </Box>
      ) : null}
    </Box>
  )
}
