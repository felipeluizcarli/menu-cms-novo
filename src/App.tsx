
import { CategoryList } from "@/cases/categories/components/category-list";
import { CategoryForm } from "@/cases/categories/components/category-form";

function App() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold">
          Gerenciamento de Categorias
        </h1>

        <div className="mb-6 rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Nova categoria
          </h2>

          <CategoryForm />
        </div>

        <CategoryList />
      </div>
    </main>
  );
}

export default App;
