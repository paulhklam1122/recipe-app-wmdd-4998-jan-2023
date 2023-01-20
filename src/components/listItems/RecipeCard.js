import { Box, Button, Center, Divider, Heading, Image, Text, VStack } from 'native-base'

const RecipeCard = props => {
  const { image, label, navigation, source, uri } = props
  return (
    <Box borderWidth={1} borderRadius='md' pb={5} mb={10}>
      <VStack space={4} divider={<Divider />}>
        <Center>
          <Heading size='xs'>{label}</Heading>
          <Text>{source}</Text>
        </Center>
        <Box>
          <Image alt={label} source={{ uri: image }} size={'2xl'} />
        </Box>
        <Box px={4} pb={4}>
          <Button
            variant='ghost'
            onPress={() => {
              navigation.navigate('Show', {
                label,
                uri
              })
            }}
          >
            View
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}

export default RecipeCard
