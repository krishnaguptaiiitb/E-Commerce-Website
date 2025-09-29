import img from "../../assets/account.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import Address from "@/components/shopping-view/Address";
import UserCartItemsContent from "@/components/shopping-view/CartItemContent";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();

  console.log(currentSelectedAddress, "Selected Address");
  console.log("Cart Items:", cartItems);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          const price =
            Number(currentItem?.salePrice) > 0
              ? Number(currentItem?.salePrice)
              : Number(currentItem?.price || 0);
          const quantity = Number(currentItem?.quantity || 0);
          return sum + price * quantity;
        }, 0)
      : 0;

  // Sample data for order details
  function handleInitiatePaypalPayment() {
    const orderData = {
      userId: user.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          Number(singleCartItem?.salePrice) > 0
            ? Number(singleCartItem?.salePrice)
            : Number(singleCartItem?.price || 0),
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "Pending",
      paymentMethod: "Paypal",
      paymentStatus: "Pending",
      totalAmount: totalCartAmount,
      orderDate: new Date().toISOString(),
      orderUpdatedAt: new Date().toISOString(),
      orderCreatedAt: new Date().toISOString(),
      paymentId: "",
      payerId: "",
    };
    console.log("Order Data:", orderData);
    // Here, you would typically send 'orderData' to your backend to create the order

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "Mahir");
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(true);
      }
    });
  }

  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL]);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="Shopping Checkout"
          className="object-center object-cover w-full h-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item._id} cartItem={item} />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold"> Total</span>
              <span className="font-bold"> ${totalCartAmount}</span>
            </div>
            <div className="mt-4 w-full">
              <Button onClick={handleInitiatePaypalPayment} className="w-full">
                Checkout with Paypal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
