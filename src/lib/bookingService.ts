// Firebase booking service
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  getDocsFromServer,
  query, 
  where, 
  orderBy, 
  Timestamp,
  runTransaction
} from "firebase/firestore";
import { db } from "./firebase";

export interface BookingRecord {
  id: string;
  userId: string;
  therapistId: number;
  therapistName: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  sessionType: string;
  status: 'confirmed' | 'cancelled';
  createdAt: Timestamp;
  userEmail?: string;
}

export interface BookingSlot {
  date: string;
  time: string;
  therapistId: number;
  isBooked: boolean;
}

// Available time slots - only 4 slots: 2 morning, 2 afternoon
export const AVAILABLE_TIME_SLOTS = [
  "09:00", // Morning slot 1
  "10:30", // Morning slot 2
  "14:00", // Afternoon slot 1
  "15:30"  // Afternoon slot 2
];

export class BookingService {
  
  // Check if user has reached booking limit (5 bookings max)
  static async checkUserBookingLimit(userId: string): Promise<boolean> {
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef, 
        where("userId", "==", userId),
        where("status", "==", "confirmed")
      );
      
      const snapshot = await getDocs(q);
      return snapshot.size < 5; // Returns true if under limit
    } catch (error) {
      console.error("Error checking booking limit:", error);
      return false;
    }
  }
  // Get user's current booking count
  static async getUserBookingCount(userId: string): Promise<number> {
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef, 
        where("userId", "==", userId),
        where("status", "==", "confirmed")
      );
      
      // Use getDocsFromServer to bypass cache and get fresh data
      const snapshot = await getDocsFromServer(q);
      return snapshot.size;
    } catch (error) {
      console.error("Error getting booking count:", error);
      return 0;
    }
  }

  // Check if a specific time slot is available
  static async isSlotAvailable(therapistId: number, date: string, time: string): Promise<boolean> {
    try {
      const slotId = `${therapistId}_${date}_${time}`;
      const slotRef = doc(db, "bookingSlots", slotId);
      const slotDoc = await getDoc(slotRef);
      
      return !slotDoc.exists(); // Available if document doesn't exist
    } catch (error) {
      console.error("Error checking slot availability:", error);
      return false;
    }
  }

  // Get all booked slots for a therapist on a specific date
  static async getBookedSlotsForDate(therapistId: number, date: string): Promise<string[]> {
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("therapistId", "==", therapistId),
        where("date", "==", date),
        where("status", "==", "confirmed")
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data().time);
    } catch (error) {
      console.error("Error getting booked slots:", error);
      return [];
    }
  }

  // Book a session (atomic transaction to prevent double booking)
  static async bookSession(
    userId: string, 
    userEmail: string,
    therapistId: number, 
    therapistName: string,
    date: string, 
    time: string, 
    sessionType: string
  ): Promise<{ success: boolean; message: string; bookingId?: string }> {
    
    try {
      // Generate booking ID
      const bookingId = `${userId}_${therapistId}_${date}_${time}`.replace(/[:.]/g, '_');
      const slotId = `${therapistId}_${date}_${time}`;
      
      // Use transaction to ensure atomic operation
      const result = await runTransaction(db, async (transaction) => {
        
        // Check if user is under booking limit
        const canBook = await this.checkUserBookingLimit(userId);
        if (!canBook) {
          throw new Error("You have reached the maximum booking limit of 5 sessions");
        }

        // Check if slot is still available
        const slotRef = doc(db, "bookingSlots", slotId);
        const slotDoc = await transaction.get(slotRef);
        
        if (slotDoc.exists()) {
          throw new Error("This time slot has already been booked");
        }

        // Create booking record
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingData: BookingRecord = {
          id: bookingId,
          userId,
          userEmail,
          therapistId,
          therapistName,
          date,
          time,
          sessionType,
          status: 'confirmed',
          createdAt: Timestamp.now()
        };

        // Create slot reservation
        const slotData: BookingSlot = {
          date,
          time,
          therapistId,
          isBooked: true
        };

        // Write both documents atomically
        transaction.set(bookingRef, bookingData);
        transaction.set(slotRef, slotData);

        return bookingId;
      });

      return {
        success: true,
        message: "Booking confirmed successfully!",
        bookingId: result
      };

    } catch (error) {
      console.error("Error booking session:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to book session"
      };
    }
  }
  // Get user's bookings
  static async getUserBookings(userId: string): Promise<BookingRecord[]> {
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("userId", "==", userId),
        where("status", "==", "confirmed"),
        orderBy("createdAt", "desc")
      );
      
      // Use getDocsFromServer to bypass cache and get fresh data
      const snapshot = await getDocsFromServer(q);
      return snapshot.docs.map(doc => doc.data() as BookingRecord);
    } catch (error) {
      console.error("Error getting user bookings:", error);
      return [];
    }
  }

  // Cancel a booking
  static async cancelBooking(bookingId: string): Promise<boolean> {
    try {
      await runTransaction(db, async (transaction) => {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingDoc = await transaction.get(bookingRef);
        
        if (!bookingDoc.exists()) {
          throw new Error("Booking not found");
        }

        const booking = bookingDoc.data() as BookingRecord;
        const slotId = `${booking.therapistId}_${booking.date}_${booking.time}`;
        const slotRef = doc(db, "bookingSlots", slotId);

        // Update booking status and remove slot reservation
        transaction.update(bookingRef, { status: 'cancelled' });
        transaction.delete(slotRef);
      });

      return true;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      return false;
    }
  }

  // Utility: Check if date is in the future
  static isDateInFuture(date: string): boolean {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    return selectedDate > today;
  }

  // Utility: Format date for display
  static formatDateForDisplay(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
