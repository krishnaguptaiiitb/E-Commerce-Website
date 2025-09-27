import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./CartItemContent";

function UserCartWrapper({ cartItems }) {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          const price =
            Number(currentItem?.salePrice) > 0
              ? Number(currentItem?.salePrice)
              : Number(currentItem?.price || 0);
          const quantity = Number(currentItem?.quantity || 0);
          return sum + price * quantity;
        }, 0)
      : 0;

  return (
    <SheetContent className="sm:max-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 ">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            Your cart is empty.
          </p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold"> Total</span>
          <span className="font-bold"> ${totalCartAmount}</span>
        </div>
      </div>
      <Button className="w-full mt-6">Checkout</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
