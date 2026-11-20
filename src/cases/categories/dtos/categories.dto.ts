
export interface CategoryDTO {
  id: string;
  name: string;
  icon: string | null;
  active: boolean;
}

export interface CreateCategoryDTO {
  name: string;
  icon?: string;
  active?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  icon?: string;
  active?: boolean;
}
