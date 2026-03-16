import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataStore } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState<"consulting" | "social" | "research">("consulting");

  const handleCreate = () => {
    if (!name.trim()) return;
    const project = dataStore.addProject({
      name: name.trim(),
      description: description.trim(),
      mode,
      status: "draft",
      tags: [mode],
    });
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto">
      <PageHeader title="New Project" subtitle="Create a new analysis project" />

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Project Name</label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Q2 Market Analysis" />
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Description</label>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description..." rows={3} />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Mode</label>
          <div className="grid grid-cols-3 gap-2">
            {(["consulting", "social", "research"] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`text-sm px-3 py-2.5 rounded-lg border transition-colors capitalize ${
                  mode === m ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleCreate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={!name.trim()}>
          Create Project
        </Button>
      </div>
    </div>
  );
}
