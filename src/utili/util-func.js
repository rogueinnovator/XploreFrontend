import { toast } from "react-hot-toast";

export function objectToFormData(
  obj,
  formData = new FormData(),
  parentKey = ""
) {
  for (const [key, value] of Object.entries(obj)) {
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (
      value instanceof Object &&
      !(value instanceof File) &&
      !Array.isArray(value)
    ) {
      // Recursively handle nested objects
      objectToFormData(value, formData, formKey);
    } else if (Array.isArray(value)) {
      // Handle arrays, including file arrays
      value.forEach((item) => {
        if (item instanceof File) {
          // Directly append files without nesting
          formData.append(key, item);
        } else if (item instanceof Object) {
          objectToFormData(item, formData, formKey);
        } else {
          formData.append(formKey, item);
        }
      });
    } else {
      // Append primitive values and files
      formData.append(formKey, value);
    }
  }
  return formData;
}

export function getBaseUrl() {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
}

export const showToast = (type, message) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};
