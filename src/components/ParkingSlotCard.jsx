export default function ParkingSlotCard({ slot, onBook }) {
  const available = slot.status === "AVAILABLE";

  return (
    <div className={`slot-card ${available ? "available" : "busy"}`}>
      <div className="slot-number">P</div>
      <h3>{slot.slotNumber}</h3>
      <p>{slot.vehicleType}</p>
      <p>₹{slot.hourlyRate}/hour</p>
      <span>{slot.status}</span>

      {available && (
        <button className="book-btn" onClick={() => onBook(slot)}>
          Book Slot
        </button>
      )}
    </div>
  );
}
