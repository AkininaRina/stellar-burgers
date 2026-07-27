import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorUI } from '@ui';

import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.burgerConstructor);

  const orderRequest = false;
  const orderModalData = null;

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
  };

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
