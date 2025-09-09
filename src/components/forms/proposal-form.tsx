"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormActions, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { calculateTotal, type ProposalLineItem, type ProposalRecord } from "@/lib/proposals";

interface ProposalFormProps {
  onSubmit: (proposal: Omit<ProposalRecord, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export default function ProposalForm({ onSubmit, onCancel }: ProposalFormProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<ProposalLineItem[]>([
    { description: "Marine construction services", amount: 0 },
  ]);

  const addItem = () => setLineItems((prev) => [...prev, { description: "", amount: 0 }]);
  const removeItem = (idx: number) => setLineItems((prev) => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, patch: Partial<ProposalLineItem>) =>
    setLineItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const total = calculateTotal(lineItems);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ clientName, clientEmail, projectName, notes, lineItems });
      }}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Client Name" required>
          <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Jane Client" />
        </FormField>
        <FormField label="Client Email" required>
          <Input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="jane@example.com" />
        </FormField>
        <FormField label="Project Name" required>
          <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Seawall Construction - Bayside" />
        </FormField>
        <FormField label="Notes">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Scope highlights, terms, schedules..." />
        </FormField>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Line Items</h3>
        {lineItems.map((item, idx) => (
          <div key={`${idx}-${item.description}`} className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
            <div className="md:col-span-8">
              <Input value={item.description} onChange={(e) => updateItem(idx, { description: e.target.value })} placeholder="Description" />
            </div>
            <div className="md:col-span-3">
              <Input type="number" step="0.01" value={item.amount} onChange={(e) => updateItem(idx, { amount: Number(e.target.value) })} placeholder="0.00" />
            </div>
            <div className="md:col-span-1">
              <Button type="button" variant="outline" onClick={() => removeItem(idx)}>Remove</Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addItem}>Add Item</Button>
        <div className="text-right font-semibold">Total: ${total.toFixed(2)}</div>
      </div>

      <FormActions>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Proposal</Button>
      </FormActions>
    </Form>
  );
}
