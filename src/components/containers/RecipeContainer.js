import { Box, Button, Center, Text } from 'native-base'

const RecipeContainer = ({ navigation, route }) => {
  const { label, uri } = route.params
  return (
    <>
      <Box width='100%'>
        <Center py={10}>
          <Text>{label}</Text>
          <Button
            onPress={() =>
              navigation.navigate('Web', {
                label,
                uri
              })
            }
          >
            View Online
          </Button>
        </Center>
      </Box>
    </>
  )
}

export default RecipeContainer
