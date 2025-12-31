import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Person {
  name: string;
  age: number;
  type: "adult" | "kid";
  documentType?: string;
  file?: File | null;
}

interface UploadDocumentsModalProps {
  persons: Person[];
  visitorType: "indian" | "foreigner" | null;
  onClose: () => void;
}

const documentTypesIndian = [
  { value: "pan", label: "PAN Card" },
  { value: "dl", label: "Driving License" },
  { value: "passport", label: "Passport" },
];

const documentTypesForeigner = [
  { value: "passport", label: "Passport" },
];

const UploadDocumentsModal: React.FC<UploadDocumentsModalProps> = ({ persons: initialPersons, visitorType, onClose }) => {
  const [persons, setPersons] = useState<Person[]>(
    initialPersons.map((p, idx) => ({ ...p, file: null, documentType: p.documentType || "" }))
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const handleChange = (idx: number, field: keyof Person, value: any) => {
    setPersons((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const validate = () => {
    for (let i = 0; i < persons.length; i++) {
      const p = persons[i];
      if (!p.name || !p.age || !p.file) return false;
      if (visitorType === "indian" && p.type === "adult" && !p.documentType) return false;
      if (visitorType === "foreigner" && !p.documentType) return false;
      if (p.file && !["application/pdf", "image/jpeg", "image/png"].includes(p.file.type)) return false;
      if (p.file && p.file.size > 1024 * 1024) return false;
      if (p.type === "kid" && (p.age < 4 || p.age >= 15)) {
        setError(`Child ${i + 1 - persons.filter((pp, idx) => pp.type === 'adult' && idx <= i).length} must be between 4 and below 15 years old for ticket eligibility.`);
        return false;
      }
    }
    if (!confirm) return false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) {
      setError("Please fill all fields, upload valid files (PDF, JPEG, PNG ≤1MB) for each person, and confirm.");
      return;
    }
    setSubmitting(true);
    // TODO: handle actual upload logic
    setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Upload Documents for All Visitors</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-4">
              <thead>
                <tr className="text-left text-sm font-semibold">
                  <th> </th>
                  <th>Name<span className="text-red-500">*</span></th>
                  <th>Age<span className="text-red-500">*</span></th>
                  <th>Document Type<span className="text-red-500">*</span></th>
                  <th>Document Name<span className="text-red-500">*</span></th>
                </tr>
              </thead>
              <tbody>
                {persons.map((person, idx) => (
                  <tr key={idx} className="align-top">
                    <td className="pr-2 font-semibold">
                      {person.type === "adult" ? `Adult ${idx + 1}` : `Child ${idx + 1 - persons.filter(p => p.type === "adult").length}`}
                    </td>
                    <td className="pr-2">
                      <input
                        className="w-full border rounded px-2 py-1"
                        value={person.name}
                        onChange={e => handleChange(idx, "name", e.target.value)}
                        required
                        disabled={idx === 0}
                        placeholder="Enter Name"
                      />
                    </td>
                    <td className="pr-2">
                      <input
                        className="w-full border rounded px-2 py-1"
                        type="number"
                        value={person.age}
                        onChange={e => handleChange(idx, "age", Number(e.target.value))}
                        required
                        disabled={idx === 0}
                        placeholder="Enter Age"
                      />
                    </td>
                    <td className="pr-2">
                      {person.type === "kid" ? (
                        <input
                          className="w-full border rounded px-2 py-1 bg-gray-100 text-gray-500"
                          value="GOVT ID PROOF"
                          disabled
                        />
                      ) : (
                        <select
                          className="w-full border rounded px-2 py-1"
                          value={person.documentType}
                          onChange={e => handleChange(idx, "documentType", e.target.value)}
                          required
                          disabled={idx === 0}
                        >
                          <option value="">Select</option>
                          {(visitorType === 'indian' ? documentTypesIndian : documentTypesForeigner).map(dt => (
                            <option key={dt.value} value={dt.value}>{dt.label}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="pr-2">
                      <label className="block">
                        <input
                          className="w-full border rounded px-2 py-1"
                          type="file"
                          accept="application/pdf,image/jpeg,image/png"
                          onChange={e => handleChange(idx, "file", e.target.files?.[0] || null)}
                          required
                        />
                        <span className="text-xs text-gray-500 block mt-1">File Format PDF, JPEG and PNG Less Than or Equal to 1MB</span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="confirm" checked={confirm} onChange={e => setConfirm(e.target.checked)} />
            <label htmlFor="confirm" className="text-sm">
              I hereby confirm that the information provided and the document uploaded by myself are self-validated and as per the best of my knowledge.<br />
              I will be able to produce the document for verification at any given time during my visit.
            </label>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <DialogFooter className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting || !validate()}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentsModal; 