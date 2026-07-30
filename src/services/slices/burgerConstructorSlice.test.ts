import { TConstructorIngredient, TOrder } from '@utils-types';
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearOrderModalData,
  createOrder
} from './burgerConstructorSlice';

const mockBun: TConstructorIngredient = {
  _id: 'bun-1',
  id: 'bun-constructor-1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'bun.png',
  image_large: 'bun-large.png',
  image_mobile: 'bun-mobile.png'
};

const mockMain: TConstructorIngredient = {
  _id: 'main-1',
  id: 'main-constructor-1',
  name: 'Биокотлета',
  type: 'main',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 424,
  image: 'main.png',
  image_large: 'main-large.png',
  image_mobile: 'main-mobile.png'
};

const mockSauce: TConstructorIngredient = {
  _id: 'sauce-1',
  id: 'sauce-constructor-1',
  name: 'Соус',
  type: 'sauce',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 100,
  price: 80,
  image: 'sauce.png',
  image_large: 'sauce-large.png',
  image_mobile: 'sauce-mobile.png'
};

const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Космический бургер',
  createdAt: '2026-07-31T00:00:00.000Z',
  updatedAt: '2026-07-31T00:00:00.000Z',
  number: 12345,
  ingredients: ['bun-1', 'main-1']
};

describe('burgerConstructor reducer', () => {
  test('возвращает начальное состояние при неизвестном экшене', () => {
    const state = burgerConstructorReducer(undefined, {
      type: 'UNKNOWN'
    });

    expect(state).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });

  test('добавляет булку в конструктор', () => {
    const action = {
      type: addIngredient.type,
      payload: mockBun
    };

    const state = burgerConstructorReducer(undefined, action);

    expect(state.bun).toEqual(mockBun);
    expect(state.ingredients).toEqual([]);
  });

  test('добавляет начинку в конструктор', () => {
    const action = {
      type: addIngredient.type,
      payload: mockMain
    };

    const state = burgerConstructorReducer(undefined, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([mockMain]);
  });

  test('удаляет ингредиент из конструктора', () => {
    const initialState = {
      bun: mockBun,
      ingredients: [mockMain, mockSauce],
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const state = burgerConstructorReducer(
      initialState,
      removeIngredient(mockMain.id)
    );

    expect(state.ingredients).toEqual([mockSauce]);
  });

  test('изменяет порядок ингредиентов', () => {
    const initialState = {
      bun: mockBun,
      ingredients: [mockMain, mockSauce],
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const state = burgerConstructorReducer(
      initialState,
      moveIngredient({
        fromIndex: 0,
        toIndex: 1
      })
    );

    expect(state.ingredients).toEqual([mockSauce, mockMain]);
  });

  test('очищает данные модального окна заказа', () => {
    const initialState = {
      bun: mockBun,
      ingredients: [mockMain],
      orderRequest: false,
      orderModalData: mockOrder,
      error: null
    };

    const state = burgerConstructorReducer(
      initialState,
      clearOrderModalData()
    );

    expect(state.orderModalData).toBeNull();
  });

  test('устанавливает состояние загрузки при createOrder.pending', () => {
    const state = burgerConstructorReducer(
      {
        bun: mockBun,
        ingredients: [mockMain],
        orderRequest: false,
        orderModalData: null,
        error: 'Ошибка'
      },
      createOrder.pending('', ['bun-1', 'main-1'])
    );

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('сохраняет заказ и очищает конструктор при createOrder.fulfilled', () => {
    const state = burgerConstructorReducer(
      {
        bun: mockBun,
        ingredients: [mockMain],
        orderRequest: true,
        orderModalData: null,
        error: null
      },
      createOrder.fulfilled(mockOrder, '', ['bun-1', 'main-1'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  test('сохраняет ошибку при createOrder.rejected', () => {
    const state = burgerConstructorReducer(
      {
        bun: mockBun,
        ingredients: [mockMain],
        orderRequest: true,
        orderModalData: null,
        error: null
      },
      createOrder.rejected(
        new Error('Ошибка создания заказа'),
        '',
        ['bun-1', 'main-1']
      )
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка создания заказа');
  });
});
