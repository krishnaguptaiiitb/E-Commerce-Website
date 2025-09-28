import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/Address";
import ShoppingOrders from "@/components/shopping-view/Orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[350px] overflow-hidden">
        <img
          width={"1600"}
          height={"300"}
          style={{ aspectRatio: "1600/300", objectFit: "cover" }}
          src={accImg}
          alt="Account"
          className="object-cover w-full h-full object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Addresses</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
