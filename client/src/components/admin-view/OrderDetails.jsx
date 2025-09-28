import { useState } from "react";
import CommonForm from "../common/Form";
import { Dialog, DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const initialFormData = {
  orderStatus: "",
};

function AdminOrderDetailsView() {
  const [formData, setFormData] = useState(initialFormData);

    function handleUpdateOrderStatus(e) {
      e.preventDefault();
      // Handle form submission
      console.log("Updating order status:", formData);
    }

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6 ">
          <div className="grid gap-2">
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium ">Order ID:</p>
              <Label>12345</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium ">Order Date:</p>
              <Label>01/01/2023</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium ">Order Price:</p>
              <Label>$100.00</Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium ">Order Status:</p>
              <Label>Shipped</Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex item-center justify-between">
                  <span>Product One</span>
                  <span>$100.00</span>
                </li>
              </ul>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Shippig Info</div>
                <div className="grid gap-0.5 text-muted-foreground">
                  <span>John Doe</span>
                  <span>Address</span>
                  <span>City</span>
                  <span>Pincode</span>
                  <span>Phone Number</span>
                  <span>Notes</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "orderStatus",
                  componentType: "select",
                  Options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "shipped", label: "Shipped" },
                    { id: "rejected", label: "Rejected" },
                    { id: "delivered", label: "Delivered" },
                    { id: "cancelled", label: "Cancelled" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateOrderStatus}
             
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AdminOrderDetailsView;
