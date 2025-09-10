"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FarmerProfile = {
  name: string;
  phone: string;
  city: string;
  description: string;
};

type RiceField = {
  id: number;
  nameLand: string;
  cityId: string;
  landArea: string;
  plantName: string;
  plantingDate: string;
  dateStart: string;
  dateEnd: string;
  qtyStart: string;
  qtyEnd: string;
  price: string;
};

export default function FarmerDashboardPage() {
  const router = useRouter();

  // ====== PROFILE / SESSION ======
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState<FarmerProfile>({
    name: "Pak Budi",
    phone: "08123456789",
    city: "Jakarta",
    description: "Petani padi berpengalaman",
  });

  useEffect(() => {
    const s = localStorage.getItem("farmerSession");
    if (s) {
      try {
        const parsed = JSON.parse(s) as FarmerProfile;
        setProfile(parsed);
      } catch {
        // ignore corrupted data
      }
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("farmerSession", JSON.stringify(profile));
    setEditProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("farmerSession");
    router.push("/farmer/login");
  };

  // ====== FIELDS ======
  const [fields, setFields] = useState<RiceField[]>([
    {
      id: 1,
      nameLand: "Sawah Pak Budi",
      cityId: "Jakarta",
      landArea: "2000 m²",
      plantName: "Padi IR64",
      plantingDate: "2025-01-10",
      dateStart: "2025-04-15",
      dateEnd: "2025-04-30",
      qtyStart: "1000 kg",
      qtyEnd: "950 kg",
      price: "Rp 5.000.000",
    },
  ]);
  const [selectedField, setSelectedField] = useState<RiceField | null>(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newField, setNewField] = useState({
    nameLand: "",
    cityId: "",
    landArea: "",
    plantName: "",
    plantingDate: "",
  });

  const handleAddField = () => {
    const created: RiceField = {
      id: Date.now(),
      nameLand: newField.nameLand || "-",
      cityId: newField.cityId || "-",
      landArea: newField.landArea || "-",
      plantName: newField.plantName || "-",
      plantingDate: newField.plantingDate || "-",
      dateStart: "-",
      dateEnd: "-",
      qtyStart: "-",
      qtyEnd: "-",
      price: "-",
    };
    setFields((prev) => [...prev, created]);
    setNewField({
      nameLand: "",
      cityId: "",
      landArea: "",
      plantName: "",
      plantingDate: "",
    });
    setAddModalOpen(false);
  };

  // avatar initials
  const initials =
    profile.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AR";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-white shadow px-6 py-4 relative">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-green-700">Cemara Supply</h1>
          <span className="text-gray-700 text-sm">Farmer Dashboard</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
              {initials}
            </div>
            <span className="font-semibold text-black">{profile.name}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-20">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-600"
                onClick={() => {
                  setEditProfileOpen(true);
                  setMenuOpen(false);
                }}
              >
                Edit Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* WELCOME BANNER */}
      <section className="m-6">
        <div
          className="rounded-lg p-6 text-white flex flex-col justify-center relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url('/rice-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "200px",
          }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold">Welcome, {profile.name.split(" ")[0]}!</h2>
            <p className="text-sm mt-2">
              Manage your fields, track harvests, and grow smarter every season.
            </p>
          </div>
        </div>
      </section>

      {/* RICE FIELDS */}
      <section className="m-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Your Rice Fields</h3>
          <span className="text-sm text-gray-800">{fields.length} fields registered</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="border rounded-lg bg-white p-4 shadow hover:shadow-lg transition text-black cursor-pointer"
              onClick={() => setSelectedField(field)}
            >
              <h4 className="font-bold text-lg">{field.nameLand}</h4>
              <p className="text-sm">{field.cityId}</p>
              <p className="text-sm mt-1">🌾 {field.plantName}</p>
              <p className="text-xs">Planted: {field.plantingDate}</p>
            </div>
          ))}

          {/* Add Field Card */}
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex flex-col justify-center items-center bg-green-600 text-white rounded-lg p-6 hover:bg-green-700 transition"
          >
            <span className="text-3xl font-bold">+</span>
            <span>Add New Field</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-950 px-6 py-3 text-center text-xs text-gray-400">
        <span>
          Copyright © 2025 All Right Reserved By CemaraSupply.com &nbsp; | &nbsp; Design By Cemara
        </span>
      </footer>

      {/* MODALS */}
      {/* FIELD DETAIL */}
      {selectedField && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-6 w-[420px] shadow-lg text-black">
            <h2 className="text-xl font-bold mb-4">{selectedField.nameLand}</h2>
            <div className="space-y-1 text-sm">
              <p><strong>City:</strong> {selectedField.cityId}</p>
              <p><strong>Plant:</strong> {selectedField.plantName}</p>
              <p><strong>Planted:</strong> {selectedField.plantingDate}</p>
              <p><strong>Area:</strong> {selectedField.landArea}</p>
              <p><strong>Harvest:</strong> {selectedField.dateStart} — {selectedField.dateEnd}</p>
              <p><strong>Qty:</strong> {selectedField.qtyStart} → {selectedField.qtyEnd}</p>
              <p className="text-green-700 font-bold"><strong>Price:</strong> {selectedField.price}</p>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setSelectedField(null)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD FIELD MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-6 w-[420px] shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Add Rice Field</h2>
            <div className="grid gap-3">
              <input
                placeholder="Field Name"
                className="border p-2 rounded"
                value={newField.nameLand}
                onChange={(e) => setNewField({ ...newField, nameLand: e.target.value })}
              />
              <input
                placeholder="City"
                className="border p-2 rounded"
                value={newField.cityId}
                onChange={(e) => setNewField({ ...newField, cityId: e.target.value })}
              />
              <input
                placeholder="Area Size"
                className="border p-2 rounded"
                value={newField.landArea}
                onChange={(e) => setNewField({ ...newField, landArea: e.target.value })}
              />
              <input
                placeholder="Plant Type"
                className="border p-2 rounded"
                value={newField.plantName}
                onChange={(e) => setNewField({ ...newField, plantName: e.target.value })}
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={newField.plantingDate}
                onChange={(e) => setNewField({ ...newField, plantingDate: e.target.value })}
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setAddModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddField}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {editProfileOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-6 w-[420px] shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="grid gap-3">
              <input
                placeholder="Name"
                className="border p-2 rounded"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <input
                placeholder="Phone Number"
                className="border p-2 rounded"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
              <input
                placeholder="City"
                className="border p-2 rounded"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="border p-2 rounded min-h-[90px]"
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setEditProfileOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
