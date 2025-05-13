import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ShipmentsPage from "../../../page/Customer/OrdersTab/Shipments";
import actions from "../../../states/Shipments/actions";

function ShipmentsList() {
  const { orderId } = useParams();
  const hash = window.location.hash;
  const dispatch = useDispatch();
  
  const {
    shipments,
    loading,
    error,
  } = useSelector((state: any) => state.shipments);

  useEffect(() => {
    console.log(orderId);
    if (!shipments.shipments || shipments.job_number !== orderId) {
      dispatch({
        type: actions.GET_SHIPMENTS,
        payload: {
          mode: "getshipments",
          job_number: orderId,
          hash: hash
        }
      });
    }
    console.log("this is the shipments in shipments container of vendor", shipments);
  }, [orderId]);

  return (
    <ShipmentsPage 
      shipments={shipments.shipments ? shipments.shipments : []} 
      entity_name={shipments.entity_name ? shipments.entity_name : null}
      job_number={shipments.versions ? shipments.versions[0]?.job_number : null}
    />
  )
}

export default ShipmentsList;
