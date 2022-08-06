const baseUrl = "http://localhost:3000"

export const getAllItems = () => fetch(`${baseUrl}/items`)