import { Center, Container } from 'native-base'
import { useEffect, useState } from 'react'
import Form from '../forms/Form'
import Loading from '../layout/Loading'
import RecipesList from '../lists/RecipesList'
import { getRecipes } from '../services/api'

const RecipesContainer = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [ingredient, setIngredient] = useState(null)

  const data = [
    {
      recipe: {
        image:
          'https://edamam-product-images.s3.amazonaws.com/web-img/889/88989a61c8c566b8d29ed6b982fb06d8.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLWVhc3QtMSJHMEUCIQDwDe6edJVqd6zTxDe6orva9ezA%2FEfQPg7RYGNPQACZ5AIgWOx3btrBIIdcGYh8TQanCndQARvTPrLYinW%2FfyKYmOIq1QQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDOQR9bOjYj%2FFT%2F8vLCqpBOcUlyXXvd9PHw5Gh6dtLROOF1m78sdAeO2mG0dp1Q4%2F1u8L3BjFgQjYVdnFXxoAZlQTYTVpo4HaSPBfJohr%2BtgwJGCGz59pNzu5hF9iaatQ52tvl37nP5xTafReI6I4N%2BjR0V3iKo8SUL8GHo2dTb6tdNzQsV0WFe6zQhFBWK0ZBV9l33vhSMcfNfI7Ig2lJoZa%2B7E%2F%2FRB5fnVzrs9VPPxHvlyCK1ZdozcroD8ZbuIlpsXbHxjGrBz26H1DL5cNJKVKGFbTNSEtuzLhsJjKZGHa0sJHcgsEVLY0v0bqY2IJ4Ko3vmyhBdzZ7TcqUukPKretvKHWIylHV7PlpUCsKYRVd7aJuSwYPUADNSIqS0H%2FXKAIKTniY95C7j%2FYeX%2BFniqEVBahWHr2Ouwme5tn8NXQMq7mpr7rAb0%2B%2FG4QfvThhu%2BuX1NjvHOTHIa4YvpwMgfCgzeZXd4aIKQ4O3BaoXzMT2Q1glyqQGl9Dwm8OEs3K9pEd6jLJAvjk2Ra11Uyfc3lNHpH%2FjET7sp1l6bGe%2BJuGn%2BXSzUZgAwLcIhrlQDIKvi2Kou0CsC35sNt%2B9patr6UGfi9ykAoyQ9ialexQxN25vSJSZBjoO4USP572sQinmg2JJ5KsimD9i1KOu5ZJfIhp2pJQ7fSpwRPs0Yspd7uC4GgIgazprgwLLu4dPbgE4O7fjNiDfjEJ%2FaZqjrj48GNue7iH0jEfrUExEbCDTapxHnUVnooF1kwgqunngY6qQGOemv48DRvI37VAEmV7I8J1bL50GnlIF2zcWXuGpAVKSGKSBj1pU9bV2Nwn3ZOzc88n0ehchHsJlg1LbWBDxcKMAMbcMzKtDic%2BjqeBCZWa%2Fig0kPw7sW2YEuqaNUUU%2FUSHL%2B5AFbesX%2B557Eg7DhpEKOIBlet5AAx0fkqW5m9mvWVirPQhlP%2B2B%2FYMeXcjU3%2BAo%2Fht%2BCpB6Vp0hEZlvxzsFxbITRuUL12&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230120T004348Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFGUCD4JFF%2F20230120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3fbe74152bd087c040d904f708089ad431079c739d581beead845281d7615c37',
        label: 'Roast sirloin of beef',
        source: 'BBC Good Food',
        uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_62ebc9d43ec31eace0c035db993eb1f5'
      }
    },
    {
      recipe: {
        image:
          'https://edamam-product-images.s3.amazonaws.com/web-img/ad3/ad35ae4c847dcd39bad104838007f84a.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLWVhc3QtMSJHMEUCIQDwDe6edJVqd6zTxDe6orva9ezA%2FEfQPg7RYGNPQACZ5AIgWOx3btrBIIdcGYh8TQanCndQARvTPrLYinW%2FfyKYmOIq1QQIgf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDOQR9bOjYj%2FFT%2F8vLCqpBOcUlyXXvd9PHw5Gh6dtLROOF1m78sdAeO2mG0dp1Q4%2F1u8L3BjFgQjYVdnFXxoAZlQTYTVpo4HaSPBfJohr%2BtgwJGCGz59pNzu5hF9iaatQ52tvl37nP5xTafReI6I4N%2BjR0V3iKo8SUL8GHo2dTb6tdNzQsV0WFe6zQhFBWK0ZBV9l33vhSMcfNfI7Ig2lJoZa%2B7E%2F%2FRB5fnVzrs9VPPxHvlyCK1ZdozcroD8ZbuIlpsXbHxjGrBz26H1DL5cNJKVKGFbTNSEtuzLhsJjKZGHa0sJHcgsEVLY0v0bqY2IJ4Ko3vmyhBdzZ7TcqUukPKretvKHWIylHV7PlpUCsKYRVd7aJuSwYPUADNSIqS0H%2FXKAIKTniY95C7j%2FYeX%2BFniqEVBahWHr2Ouwme5tn8NXQMq7mpr7rAb0%2B%2FG4QfvThhu%2BuX1NjvHOTHIa4YvpwMgfCgzeZXd4aIKQ4O3BaoXzMT2Q1glyqQGl9Dwm8OEs3K9pEd6jLJAvjk2Ra11Uyfc3lNHpH%2FjET7sp1l6bGe%2BJuGn%2BXSzUZgAwLcIhrlQDIKvi2Kou0CsC35sNt%2B9patr6UGfi9ykAoyQ9ialexQxN25vSJSZBjoO4USP572sQinmg2JJ5KsimD9i1KOu5ZJfIhp2pJQ7fSpwRPs0Yspd7uC4GgIgazprgwLLu4dPbgE4O7fjNiDfjEJ%2FaZqjrj48GNue7iH0jEfrUExEbCDTapxHnUVnooF1kwgqunngY6qQGOemv48DRvI37VAEmV7I8J1bL50GnlIF2zcWXuGpAVKSGKSBj1pU9bV2Nwn3ZOzc88n0ehchHsJlg1LbWBDxcKMAMbcMzKtDic%2BjqeBCZWa%2Fig0kPw7sW2YEuqaNUUU%2FUSHL%2B5AFbesX%2B557Eg7DhpEKOIBlet5AAx0fkqW5m9mvWVirPQhlP%2B2B%2FYMeXcjU3%2BAo%2Fht%2BCpB6Vp0hEZlvxzsFxbITRuUL12&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230120T004348Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=ASIASXCYXIIFGUCD4JFF%2F20230120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ddbfc055250511a55fd8932b540b66352805a950dbc1597a4bc2c1b313007bc7',
        label: 'Beef Tea',
        source: 'Epicurious',
        uri: 'http://www.edamam.com/ontologies/edamam.owl#recipe_0f3a359371750f372c7ac3c1459751d9'
      }
    }
  ]

  const fetchRecipes = () => {
    setIsLoading(true)

    // getRecipes(ingredient).then(
    //   recipes => {
    //     setRecipes(recipes)
    //     setIsLoading(false)
    //   },
    //   error => {
    //     alert('Error', `Something went wrong! ${error}`)
    //   }
    // )
    setRecipes(data)
    setIsLoading(false)
  }

  const handleInputChange = ingredient => {
    setIngredient(ingredient)
  }

  return (
    <Container>
      <Center px={4}>
        <Form onInputChange={handleInputChange} fetchRecipes={fetchRecipes} />
        {isLoading ? <Loading /> : <RecipesList recipes={recipes} navigation={navigation} />}
      </Center>
    </Container>
  )
}

export default RecipesContainer
