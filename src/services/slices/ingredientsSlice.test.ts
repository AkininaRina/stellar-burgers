import { TIngredient } from '@utils-types';
import { getIngredients, ingredientsReducer } from './ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image.png',
    image_mobile: 'image-mobile.png',
    image_large: 'image-large.png'
  }
];

describe('ingredients reducer', () => {
  test('возвращает начальное состояние при неизвестном экшене', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
  });

  test('устанавливает состояние загрузки при getIngredients.pending', () => {
    const state = ingredientsReducer(
      {
        ingredients: mockIngredients,
        isLoading: false,
        error: 'Ошибка'
      },
      getIngredients.pending('')
    );

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: true,
      error: null
    });
  });

  test('сохраняет ингредиенты при getIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      {
        ingredients: [],
        isLoading: true,
        error: null
      },
      getIngredients.fulfilled(mockIngredients, '')
    );

    expect(state).toEqual({
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  test('сохраняет ошибку при getIngredients.rejected', () => {
    const state = ingredientsReducer(
      {
        ingredients: [],
        isLoading: true,
        error: null
      },
      getIngredients.rejected(new Error('Ошибка загрузки'), '')
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки'
    });
  });
});
