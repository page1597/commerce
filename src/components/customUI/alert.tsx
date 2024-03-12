import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";

export default function Alert({
  showAlert,
  setShowAlert,
  alertContent,
  setConfirm,
}: {
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
  alertContent: { title: string; desc: string; nav?: string | null };
  setConfirm?: (confirm: boolean) => void | null;
}) {
  const navigate = useNavigate();

  function onCancel() {
    setShowAlert(false);
    if (setConfirm) {
      setConfirm(false);
    }
    if (alertContent.nav) {
      navigate(alertContent.nav);
    }
  }

  function onAction() {
    if (setConfirm) {
      setConfirm(true);
      setShowAlert(false);
    }
  }
  return (
    <AlertDialog open={showAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
          <AlertDialogDescription>{alertContent.desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{setConfirm ? <>취소</> : <>확인</>}</AlertDialogCancel>
          {setConfirm ? <AlertDialogAction onClick={onAction}>확인</AlertDialogAction> : <></>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
