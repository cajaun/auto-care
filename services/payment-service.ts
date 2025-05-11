import { db } from "@/FirebaseConfig";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { toast } from "sonner-native";


interface PaymentData {
  type: string;
  name: string;
  date: string;
  selectedMethod: string;
}

export const handlePayment = async ({ type, name, date, selectedMethod }: PaymentData) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;


    if (!user) {
      console.error("User not authenticated");
      alert("Please log in to proceed with payment.");
      return;
    }

    //  payment data to store in firebase
    const paymentData = {
      userId: user.uid,
      userEmail: user.email || "",
      type: type,
      name: name,
      date: date,
      paymentMethod: selectedMethod,
      createdAt: Timestamp.now(), 
    };


    const docRef = await addDoc(collection(db, "payments"), paymentData);


    toast.success("Payment successfully made!", {
      duration: 6000,
      position: "bottom-center",
    });

    console.log("Payment recorded successfully with ID:", docRef.id);




  } catch (error) {
    console.error("Error saving payment:", error);
    alert("An error occurred while processing your payment. Please try again.");
  }
};

export const fetchPaymentsByType  = (type: string, callback: (payments: any[]) => void) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User not authenticated");
    alert("Please log in to view payment history.");
    return () => {}; 
  }

  const paymentsRef = collection(db, "payments");

  // query to get payments filtered by user ID and payment type
  const q = query(
    paymentsRef,
    where("userId", "==", user.uid),
    where("type", "==", type)
  );

  // onsnapshot listener for when data changes in the history listing and update the ui
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const payments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(payments);
    },
    (error) => {
      console.error("Error listening to payments:", error);
      alert("An error occurred while listening for payments.");
    }
  );

  return unsubscribe;
};
