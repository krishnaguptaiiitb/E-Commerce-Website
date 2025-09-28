import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonForm from "../common/Form";
import { useEffect, useState } from "react";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address-slice/index.js";
import AddressCard from "./AddressCard";
import { useToast } from "@/hooks/useToast.js";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const toast = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "Limit Reached",
        description: "You can only have up to 3 addresses.",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            ...formData,
            addressId: currentEditedId,
            userId: user?.id,
          })
        ).then((data) => {
          console.log("Address edited:", data);
          if (data?.payload?.success) {
            dispatch(fetchAllAddress({ userId: user?.id }));
            setFormData(initialAddressFormData);
            setCurrentEditedId(null);
            toast({
              title: "Success",
              description: "Address updated successfully.",
            });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            console.log("Address added:", data);
            if (data?.payload?.success) {
              dispatch(fetchAllAddress({ userId: user?.id }));
              setFormData(initialAddressFormData);
              toast({
                title: "Success",
                description: "Address added successfully.",
              });
            }
          }
        );
  }

  function handleDeleteAddress(getCurrentAddress) {
    console.log("Delete address:", getCurrentAddress);
    dispatch(
      deleteAddress({ addressId: getCurrentAddress._id, userId: user?.id })
    ).then((data) => {
      console.log("Address deleted:", data);
      if (data?.payload?.success) {
        dispatch(fetchAllAddress({ userId: user?.id }));
      }
      toast({
        title: "Success",
        description: "Address deleted successfully.",
      });
    });
  }

  function handleEditAddress(getCurrentAddress) {
    console.log("Edit address:", getCurrentAddress);
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
    toast({
      title: "Edit Mode",
      description: "You can now edit the address details.",
    });
  }

  console.log("Address List:", addressList);

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddress({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-4">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              addressInfo={singleAddressItem}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <h1 className="font-bold text-center col-span-3">No Address Found</h1>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
