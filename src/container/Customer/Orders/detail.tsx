import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OrdersDetail from "../../../page/Customer/OrdersTab/OrdersDetail";
import actions from "../../../states/Orders/actions";

import { Order } from '../../../types';

function OrderDetail() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  
  const {
    order,
    loading,
    error,
  } = useSelector((state: any) => state.orders);

  useEffect(() => {
    getOrder();
  }, [dispatch]);

  const getOrder = () => {
    dispatch({
      type: actions.GET_ORDER,
      payload: {
        mode: "getAll",
        job_number: orderId
      }
    });

    console.log("order ==============> ", order);
  }
  
  return (
    <OrdersDetail selectedOrderData={order.data ? order.data.job : null} />
  )

}

export default OrderDetail