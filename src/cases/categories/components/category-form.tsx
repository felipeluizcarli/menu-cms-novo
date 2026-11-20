
import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useCreateCategory } from "../hooks/use-category";

export function CategoryForm() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [active, setActive] = useState(true);

  const createCategory = useCreateCategory();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    createCategory.mutate(
      {
        name: name.trim(),
        icon: icon.trim() || undefined,
        active,
      },
      {
        onSuccess: () => {
          setName("");
          setIcon("");
          setActive(true);
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da categoria</Label>

        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Informe o nome"
          maxLength={60}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">URL do ícone</Label>

        <Input
          id="icon"
          type="url"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="active"
          checked={active}
          onCheckedChange={(checked) => setActive(checked === true)}
        />

        <Label htmlFor="active">Categoria ativa</Label>
      </div>

      <Button type="submit" disabled={createCategory.isPending}>
        {createCategory.isPending ? "Salvando..." : "Cadastrar"}
      </Button>

      {createCategory.isError && (
        <p className="text-sm text-red-500">
          Erro ao cadastrar categoria.
        </p>
      )}
    </form>
  );
}
