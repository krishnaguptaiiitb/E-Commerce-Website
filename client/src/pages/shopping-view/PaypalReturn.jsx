import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice/index.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId")).then(
        (data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
          }
          window.location.href = "/shop/payment-success";
        }
      );

      dispatch(capturePayment({ paymentId, payerId, orderId }));
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please Wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
