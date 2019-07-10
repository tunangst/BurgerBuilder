import * as actionTypes from './actions';

const initialState = {
    //bottom up
    ingredients: [
        // 'bacon',
        // 'cheese',
        // 'bun-top',
        // 'lettuce',
        // 'patty',
        // 'cheese',
        // 'bacon',
        // 'cheese',
        // 'patty',
        'bun-bottom'
    ],
    ingredientCount: {
        "bun-top": 0,
        cheese: 0,
        lettuce: 0,
        bacon: 0,
        patty: 0,
        "bun-bottom": 1,
    },
    totalPrice: 1.00
}
const INGREDIENT_PRICES = {
    lettuce: .70,
    cheese: 1.00,
    patty: 1.50,
    bacon: 1.00,
    'bun-top': 1.30,
    'bun-bottom': 1.00,

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            return {
                ...state,
                ingredients: [
                    action.ingredientName,
                    ...state.ingredients
                ],
                ingredientCount: {
                    ...state.ingredientCount,
                    [action.ingredientName]: state.ingredientCount[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:

            let checkIngredients = [...state.ingredients];

            if (state.ingredients.length > 0 && state.ingredientCount[action.ingredientName] > 0) {
                for (let i = 0; i < checkIngredients.length; i++) {
                    if (checkIngredients[i] === action.ingredientName) {
                        checkIngredients.splice(i, 1);
                        break;
                    } else {
                        console.log(`there is no food of that type on the burger currently`);
                    }
                }
            }

            //'bun-bottom'
            return {
                ...state,
                ingredients: checkIngredients,
                ingredientCount: {
                    ...state.ingredientCount,
                    [action.ingredientName]: state.ingredientCount[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default: return state;
    }
};

export default reducer;