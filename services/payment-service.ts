import { db } from "@/FirebaseConfig";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";


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


    console.log("Payment recorded successfully with ID:", docRef.id);


  } catch (error) {
    console.error("Error saving payment:", error);
    alert("An error occurred while processing your payment. Please try again.");
  }
};

export const fetchPaymentsByType = async (type: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      alert("Please log in to view payment history.");
      return [];
    }

    const paymentsRef = collection(db, "payments");
    const q = query(
      paymentsRef,
      where("userId", "==", user.uid),
      where("type", "==", type)
    );

    const querySnapshot = await getDocs(q);
    const payments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return payments;

  } catch (error) {
    console.error("Error fetching payments:", error);
    alert("An error occurred while fetching your payments.");
    return [];
  }
};
