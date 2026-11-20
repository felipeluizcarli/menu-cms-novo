
import { useState } from "react";
import { CategoryList } from "@/cases/categories/components/category-list";
import { CategoryForm } from "@/cases/categories/components/category-form";
import type { CategoryDTO } from "./cases/categories/dtos/categories.dto";


function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDTO | undefined>(undefined);

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold">
          Gerenciamento de Categorias
        </h1>

        <div className="mb-6 rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            {selectedCategory
              ? "Editar categoria"
              : "Nova categoria"}
          </h2>

          <CategoryForm
            key={selectedCategory?.id ?? "new"}
            category={selectedCategory}
            onCancel={() => setSelectedCategory(undefined)}
          />
        </div>

        <CategoryList onEdit={setSelectedCategory} />
      </div>
    </main>
  );
}

export default App;
