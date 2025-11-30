import * as yup from 'yup';

export const productSchema = yup.object().shape({
  sku: yup
    .string()
    .required('SKU es requerido')
    .min(3, 'SKU debe tener al menos 3 caracteres')
    .max(50, 'SKU no puede exceder 50 caracteres'),
  name: yup
    .string()
    .required('Nombre es requerido')
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .max(100, 'Nombre no puede exceder 100 caracteres'),
  description: yup
    .string()
    .required('Descripción es requerida')
    .min(10, 'Descripción debe tener al menos 10 caracteres')
    .max(500, 'Descripción no puede exceder 500 caracteres'),
  price: yup
    .number()
    .required('Precio es requerido')
    .positive('Precio debe ser positivo')
    .typeError('Precio debe ser un número válido')
    .min(0.01, 'Precio debe ser mayor a 0'),
  quantity: yup
    .number()
    .required('Cantidad es requerida')
    .integer('Cantidad debe ser un número entero')
    .min(0, 'Cantidad no puede ser negativa')
    .typeError('Cantidad debe ser un número válido'),
  size: yup
    .string()
    .required('Talla es requerida')
    .max(20, 'Talla no puede exceder 20 caracteres'),
  category: yup
    .string()
    .required('Categoría es requerida')
    .max(50, 'Categoría no puede exceder 50 caracteres'),
  condition: yup
    .string()
    .required('Condición es requerida')
    .oneOf(['new', 'like-new', 'good', 'used', 'damaged'], 'Condición no válida'),
  brand: yup
    .string()
    .max(50, 'Marca no puede exceder 50 caracteres'),
  color: yup
    .string()
    .max(30, 'Color no puede exceder 30 caracteres'),
  tags: yup
    .string()
    .max(200, 'Tags no pueden exceder 200 caracteres'),
  available: yup
    .boolean()
    .required('Disponibilidad es requerida'),
});

// Esquema para validar archivo de imagen
export const imageSchema = yup.object().shape({
  imageFile: yup
    .mixed()
    .test('fileSize', 'La imagen es muy pesada (max 5MB)', (value: any) => {
      if (!value) return true; // Opcional
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Formato no soportado', (value: any) => {
      if (!value) return true; // Opcional
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
    })
});