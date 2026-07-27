import React, { FC, memo } from 'react';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-info.module.css';

import { OrderInfoUIProps } from './type';
import { OrderStatus } from '@components';

export const OrderInfoUI: FC<OrderInfoUIProps> = memo(({ orderInfo }) => (
  <div className={styles.wrap}>
    <p className={`text text_type_digits-default ${styles.number}`}>
      #{orderInfo.number}
    </p>

    <h3 className={`text text_type_main-medium ${styles.header}`}>
      {orderInfo.name}
    </h3>

    <OrderStatus status={orderInfo.status} />

    <p className={`text text_type_main-medium ${styles.composition}`}>
      Состав:
    </p>

    <ul className={styles.list}>
      {Object.values(orderInfo.ingredientsInfo).map((item) => (
        <li className={styles.item} key={item._id}>
          <div className={styles.imgWrap}>
            <div className={styles.border}>
              <img
                className={styles.img}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
          </div>

          <span
            className={`text text_type_main-default ${styles.ingredientName}`}
          >
            {item.name}
          </span>

          <span className={`text text_type_digits-default ${styles.quantity}`}>
            {item.count} × {item.price}
          </span>

          <CurrencyIcon type='primary' />
        </li>
      ))}
    </ul>

    <div className={styles.bottom}>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.date}`}
      >
        <FormattedDate date={orderInfo.date} />
      </p>

      <div className={styles.price}>
        <span className='text text_type_digits-default'>{orderInfo.total}</span>

        <CurrencyIcon type='primary' />
      </div>
    </div>
  </div>
));
