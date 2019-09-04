import React, { ReactElement, useContext } from "react";
import { PlayerTurnOrder } from "../../logic/Player";
import { ThemeContext } from "./themes/ThemeProvider";
import { css } from "emotion";

export interface OrderListProps {
  orders: PlayerTurnOrder[];
  removeOrder: (index: number) => void;
}

const OrderList = ({ orders, removeOrder }: OrderListProps): ReactElement | null => {
  const theme = useContext(ThemeContext);

  if (!orders || orders.length === 0) {
    return null;
  }

  const spanStyle = css`
    cursor: pointer;
    margin: 0 0 0 ${theme.units.medium};
    font-size: ${theme.fontSizes.smallest};
  `;

  return (
    <ul>
      {orders.map((order, index) => (
        <li key={`${order.amount}${order.origin}${order.destination}`}>
          <span>
            Send fleet({order.amount}) from {order.origin} to {order.destination}
          </span>
          <span className={spanStyle} onClick={() => removeOrder(index)} data-testid="remove">
            ❌
          </span>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
