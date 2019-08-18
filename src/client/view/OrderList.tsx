import React, { ReactElement } from "react";
import { PlayerTurnOrder } from "../../logic/Player";

export interface OrderListProps {
  orders: PlayerTurnOrder[];
}

const OrderList = ({ orders }: OrderListProps): ReactElement | null =>
  orders && orders.length > 0 ? (
    <ul>
      {orders.map((order) => (
        <li key={`${order.amount}${order.origin}${order.destination}`}>
          Send fleet({order.amount}) from {order.origin} to {order.destination}
        </li>
      ))}
    </ul>
  ) : null;

export default OrderList;
