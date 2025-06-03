export interface Person {
  names: string;
  lastNames: string;
  id: string;
  typeId: string;
  dateBirth: string;
  numberPhone: string;
}

export interface ClienteRequest {
  person: Person;
  weight: number;
  stature: number;
  // trainingPlan, anamnesis, sesiones se pueden agregar después
}

export const crearCliente = async (cliente: ClienteRequest) => {
  const response = await fetch("http://localhost:8080/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};