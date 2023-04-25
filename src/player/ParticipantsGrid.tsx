import { Box, Flex } from '@chakra-ui/react'
import { ParticipantView } from './ParticipantView'

interface ParticipantsGridProps {
  participants: string[]
  localParticipantId: string
}

export const ParticipantsGrid: React.FC<ParticipantsGridProps> = ({
  participants,
  localParticipantId,
}) => {
  const renderLayout = () => {
    const filteredParticipants = participants.filter(
      (participantId) => participantId !== localParticipantId,
    )
    console.log(filteredParticipants.length + ' ' + filteredParticipants)
    switch (filteredParticipants.length) {
      case 2:
      case 3:
        return (
          <Flex>
            {filteredParticipants.map((participantId) => (
              <Box flex="1" key={participantId}>
                <ParticipantView participantId={participantId} isLocal={true} />
              </Box>
            ))}
          </Flex>
        )
      case 4:
      case 5:
      case 6:
        return (
          <Flex flexDir="column">
            {Array.from(
              { length: Math.ceil(filteredParticipants.length / 2) },
              (_, rowIndex) => (
                <Flex key={rowIndex}>
                  {filteredParticipants
                    .slice(rowIndex * 2, rowIndex * 2 + 2)
                    .map((participantId) => (
                      <Box flex="1" key={participantId}>
                        <ParticipantView
                          participantId={participantId}
                          isLocal={false}
                        />
                      </Box>
                    ))}
                </Flex>
              ),
            )}
          </Flex>
        )
      default:
        return (
          <Flex flexDir="column">
            {Array.from(
              { length: Math.ceil(filteredParticipants.length / 3) },
              (_, rowIndex) => (
                <Flex key={rowIndex}>
                  {filteredParticipants
                    .slice(rowIndex * 3, rowIndex * 3 + 3)
                    .map((participantId) => (
                      <Box flex="1" key={participantId}>
                        <ParticipantView
                          participantId={participantId}
                          isLocal={true}
                        />
                      </Box>
                    ))}
                </Flex>
              ),
            )}
          </Flex>
        )
    }
  }

  return (
    <Box>
      {renderLayout()}
      <Box>
        <ParticipantView participantId={localParticipantId} isLocal={true} />
      </Box>
    </Box>
  )
}
