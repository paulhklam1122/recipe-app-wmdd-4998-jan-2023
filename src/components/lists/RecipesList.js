import { FlatList } from 'native-base'
import RecipeCard from '../listItems/RecipeCard'

const RecipesList = ({ navigation, recipes }) => {
  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => (
        <RecipeCard
          image={item.recipe.image}
          label={item.recipe.label}
          source={item.recipe.source}
          uri={item.recipe.uri}
          navigation={navigation}
        />
      )}
      keyExtractor={item => item.recipe.url}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default RecipesList
