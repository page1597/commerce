import { Button } from "./ui/button";
import { FieldValues } from "react-hook-form";
import { BasketProductType } from "@/types/product";
import { Dispatch, SetStateAction, useEffect } from "react";
import useOrderProcessing from "@/hooks/order/useOrderProcessing";
import useOrder from "@/hooks/order/useOrder";
import Alert from "./alert";

declare global {
  interface Window {
    IMP: any;
  }
}

export default function PaymentButton({
  fieldValues,
  orderProducts,
  isAgreedTerm,
  setIsAgreedTerm,
  userId,
}: {
  fieldValues: FieldValues;
  orderProducts: BasketProductType[];
  isAgreedTerm: boolean;
  setIsAgreedTerm: Dispatch<SetStateAction<boolean>>;
  userId?: string | null;
}) {
  const { checkIsOutOfStock, decreaseProductStock, increaseProductStock } = useOrderProcessing(userId, orderProducts);
  const { onClickPayment, setShowAlert, showAlert, alertContent } = useOrder(
    userId,
    fieldValues,
    isAgreedTerm,
    orderProducts,
    checkIsOutOfStock,
    decreaseProductStock,
    increaseProductStock
  );

  useEffect(() => {
    setIsAgreedTerm(false);
  }, []);

  return (
    <>
      <Alert setShowAlert={setShowAlert} showAlert={showAlert} alertContent={alertContent} />
      {/* 모바일에서 결제 오류 발생 */}
      <Button id="payment" className="md:flex hidden bg-zinc-700 hover:bg-zinc-800" onClick={onClickPayment}>
        결제하기
      </Button>
    </>
  );
}
